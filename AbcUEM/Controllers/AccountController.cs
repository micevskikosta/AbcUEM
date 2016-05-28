using System;
using System.Globalization;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using AbcUEM.Models;
using System.Collections.Generic;
using System.IO;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using Newtonsoft.Json;
using System.Threading;
using System.Web.Security;
using System.Security.Principal;

namespace AbcUEM.Controllers
{
    [Authorize]
    public class AccountController : Controller
    {
        private ApplicationSignInManager _signInManager;
        private ApplicationUserManager _userManager;

        public AccountController()
        {
        }

        public AccountController(ApplicationUserManager userManager, ApplicationSignInManager signInManager)
        {
            UserManager = userManager;
            SignInManager = signInManager;
        }

        public ApplicationSignInManager SignInManager
        {
            get
            {
                return _signInManager ?? HttpContext.GetOwinContext().Get<ApplicationSignInManager>();
            }
            private set
            {
                _signInManager = value;
            }
        }

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }

        [AllowAnonymous]
        public ActionResult Login(string returnUrl)
        {
            ViewBag.ReturnUrl = returnUrl;
            return View();
        }

        //---Login user
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Login(LoginViewModel model, string returnUrl)
        {

            using (AbcUEMDbEntities db = new AbcUEMDbEntities())
            {
                var userActive = (from x in db.AspNetUsers where x.UserName == model.Username select x.Active).FirstOrDefault();

                if (userActive == true)
                {
                    if (!ModelState.IsValid)
                    {
                        return View(model);
                    }

                    // This doesn't count login failures towards account lockout
                    // To enable password failures to trigger account lockout, change to shouldLockout: true
                    var result = await SignInManager.PasswordSignInAsync(model.Username, model.Password, model.RememberMe, shouldLockout: false);
                    switch (result)
                    {
                        case SignInStatus.Success:
                            return RedirectToLocal(returnUrl);
                        case SignInStatus.LockedOut:
                            return View("Lockout");
                        case SignInStatus.RequiresVerification:
                            return RedirectToAction("SendCode", new { ReturnUrl = returnUrl, RememberMe = model.RememberMe });
                        case SignInStatus.Failure:
                            ModelState.AddModelError("", "Invalid login attempt.");
                            return View(model);
                        default:
                            ModelState.AddModelError("", "Invalid login attempt.");
                            return View(model);
                    }
                }
                else
                {
                    ModelState.AddModelError("", "Invalid login attempt.");
                    return View(model);
                }
            }


        }

        //---LogOff user
        [HttpPost]
        [ValidateAntiForgeryToken]
        [AllowAnonymous]
        public ActionResult LogOff()
        {
            AuthenticationManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie);
            FormsAuthentication.SignOut();
            return RedirectToAction("Index", "Home");
        }

        //---Gets all the roles from the db.AspNetRoles which includes the departments. 1 is for Role, 2 for Department.
        [AllowAnonymous]
        [HttpGet]
        public ActionResult Roles()
        {
            using (AbcUEMDbEntities db = new AbcUEMDbEntities())
            {
                var allRoles = db.AspNetRoles.Select(e => new { e.Id, e.Name, e.Order }).ToList();
                return Json(allRoles, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public ActionResult EditUser()
        {

            return View();
        }

        //---Gets user data based on received Id.
        [HttpPost]
        public ActionResult GetUser(string id)
        {
            using (AbcUEMDbEntities db = new AbcUEMDbEntities())
            {
                var user = (from x in db.AspNetUsers where x.UserName == User.Identity.Name select x.Id).FirstOrDefault();

                if (id == null)
                {
                    id = user;
                }

                var query = (from u in db.AspNetUsers
                             join ur in db.AspNetUserRoles on u.Id equals ur.UserId
                             join r in db.AspNetRoles on ur.RoleId equals r.Id
                             where u.Id == id
                             select new
                             {
                                 Id = u.Id,
                                 Name = u.Name,
                                 LastName = u.LastName,
                                 UserName = u.UserName,
                                 Email = u.Email,
                                 Active = u.Active
                             }).FirstOrDefault();

                return Json(query, JsonRequestBehavior.AllowGet);
            }
        }

        //---Returns Username of client based on received email.
        public string GetUserName(string email)
        {
            var name = "";
            using (AbcUEMDbEntities db = new AbcUEMDbEntities())
            {
                name = (from x in db.AspNetUsers
                        where x.Email == email
                        select x.UserName).FirstOrDefault();

                //If the username don't exists based on received email, return the non-existing email. 
                //This function is created for ResetPassword method check - UserManager.FindByNameAsync(GetUserName(model.Email)),
                //because it cannot receive null, we return the entered email.
                if (name == null)
                {
                    return email;
                }

                return name;
            }
        }

        //---Returns user roles (RoleId and RoleName) based on received id of user.
        [HttpPost]
        public ActionResult GetUserRoles(string id)
        {
            using (AbcUEMDbEntities db = new AbcUEMDbEntities())
            {

                var roles = (from ur in db.AspNetUserRoles
                             join r in db.AspNetRoles on ur.RoleId equals r.Id
                             where ur.UserId == id
                             select new
                             {
                                 RoleID = ur.RoleId,
                                 RoleName = r.Name
                             }).ToList();

                return Json(roles, JsonRequestBehavior.AllowGet);
            }
        }

        //---Gets users for paging that receives the pageIndex, defined itemsPerPage and search text.
        [HttpPost]
        public ActionResult GetPagingUsers(int pageIndex, int itemsPerPage, string search)
        {
            using (AbcUEMDbEntities db = new AbcUEMDbEntities())
            {
                return Json(db.GetUsers(pageIndex, itemsPerPage, search).Select(e => new { e.Id, e.Name, e.LastName, e.UserName, e.Email, e.Active }).ToList(), JsonRequestBehavior.AllowGet);
            }
        }

        //---Gets the number of total users, based on search text. If text is empty it counts all the users.
        [HttpPost]
        [AllowAnonymous]
        public ActionResult GetUsersTotal(string search)
        {
            using (AbcUEMDbEntities db = new AbcUEMDbEntities())
            {
                return Json(db.GetUsersTotal(search).ToList(), JsonRequestBehavior.AllowGet);
            }
        }

        //---Returns firstRegister page if db.AspNetUsers is empty
        [AllowAnonymous]
        [HttpGet]
        public ActionResult FirstRegister()
        {
            using (AbcUEMDbEntities db = new AbcUEMDbEntities())
            {
                var query = db.AspNetUsers.Count();

                if (query > 0)
                {
                    return RedirectToAction("Login");
                }
                else
                {
                    return View();
                }
            }
        }

        //---Inserts first user with SuperAdmin role in db.AspNetUsers
        [HttpPost]
        public async Task<ActionResult> FirstRegister(RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = new ApplicationUser { UserName = model.UserName, Email = model.Email, Name = model.Name, LastName = model.LastName };
                var adminresult = await UserManager.CreateAsync(user, model.Password);

                //Add User to the selected Roles 
                if (adminresult.Succeeded)
                {
                    var result = await UserManager.AddToRolesAsync(user.Id, new string[] { "Administrator" });
                    if (result.Succeeded)
                    {
                        return RedirectToAction("Index", "Home");
                    }
                }

            }
            return View(model);
        }

        //[Authorize(Roles = "SuperAdmin")]
        [AllowAnonymous]
        [HttpGet]
        public ActionResult Register()
        {
            return View();
        }

        //---Inserts user in db.AspNetUsers with list of RoleDepartments
        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult> Register(RegisterViewModel model, List<string> lista)
        {
            var res = false;
            if (ModelState.IsValid)
            {
                try
                {

                    var user = new ApplicationUser { UserName = model.UserName, Email = model.Email, Active = true, Name = model.Name, LastName = model.LastName };
                    var adminresult = await UserManager.CreateAsync(user, model.Password);

                    //Add User to the selected Roles 
                    if (adminresult.Succeeded)
                    {
                        //Inserts RoleDepartments in AspNetUserRoles                
                        foreach (var item in model.RoleDepartments)
                        {
                            var result = await UserManager.AddToRolesAsync(user.Id, new string[] { item });
                        }

                        //Create directory with attached photo saved in into the directory
                        if (model.Photo != null)
                        {

                            if (!Directory.Exists(Server.MapPath("~/Images/Users/")))
                            {
                                Directory.CreateDirectory(Server.MapPath("~/Images/Users/"));
                            }

                            var fileName = model.UserName + ".png";
                            var path = Path.Combine(Server.MapPath("~/Images/Users/"), fileName);
                            var pathToResized = Path.Combine(Server.MapPath("~/Images/Users/"), "resized-" + fileName);
                            model.Photo.SaveAs(path);
                            Bitmap resizedImage = resizeImage(30, 30, path);
                            resizedImage.Save(pathToResized);
                            //return RedirectToAction("Index", "Home");
                        }

                        res = true;
                    }
                    else
                    {
                        res = false;
                    }

                }
                catch(Exception e)
                {
                    res = false;
                }


                //if (result.Succeeded)
                //{
                //    await SignInManager.SignInAsync(user, isPersistent: false, rememberBrowser: false);

                //    // For more information on how to enable account confirmation and password reset please visit http://go.microsoft.com/fwlink/?LinkID=320771
                //    // Send an email with this link
                //    // string code = await UserManager.GenerateEmailConfirmationTokenAsync(user.Id);
                //    // var callbackUrl = Url.Action("ConfirmEmail", "Account", new { userId = user.Id, code = code }, protocol: Request.Url.Scheme);
                //    // await UserManager.SendEmailAsync(user.Id, "Confirm your account", "Please confirm your account by clicking <a href=\"" + callbackUrl + "\">here</a>");

                //    return RedirectToAction("Index", "Home");
                //}
                //AddErrors(result);
            }

            // If we got this far, something failed, redisplay form
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        //---Resizing attached photo
        public Bitmap resizeImage(int newWidth, int newHeight, string stPhotoPath)
        {
            Image imgPhoto = Image.FromFile(stPhotoPath);
            var ResizedImage = ResizeImage(imgPhoto, newWidth, newHeight);
            imgPhoto.Dispose();
            return ResizedImage;
        }

        public static Bitmap ResizeImage(Image image, int width, int height)
        {
            var destRect = new Rectangle(0, 0, width, height);
            var destImage = new Bitmap(width, height);

            destImage.SetResolution(image.HorizontalResolution, image.VerticalResolution);

            using (var graphics = Graphics.FromImage(destImage))
            {
                graphics.CompositingMode = CompositingMode.SourceCopy;
                graphics.CompositingQuality = CompositingQuality.HighQuality;
                graphics.InterpolationMode = InterpolationMode.HighQualityBicubic;
                graphics.SmoothingMode = SmoothingMode.HighQuality;
                graphics.PixelOffsetMode = PixelOffsetMode.HighQuality;

                using (var wrapMode = new ImageAttributes())
                {
                    wrapMode.SetWrapMode(WrapMode.TileFlipXY);
                    graphics.DrawImage(image, destRect, 0, 0, image.Width, image.Height, GraphicsUnit.Pixel, wrapMode);
                }
            }

            return destImage;
        }
        //--------------------------

        //---Update user with received parameters from the viewmodel
        [HttpPost]
        public async Task<ActionResult> UpdateUser(RegisterViewModel model)
        {
            var res = false;
            try
            {
                if (ModelState.IsValid)
                {
                    //Get userId based of logged user identity name
                    using (AbcUEMDbEntities db = new AbcUEMDbEntities())
                    {

                        var userId = (from x in db.AspNetUsers where x.UserName == User.Identity.Name select x.Id).FirstOrDefault();

                        //If received value from viewModel of model.Id is null, then assign logged userId value to model.Id 
                        //This is because of editing of logged user, it can take the Id of the logged user.
                        if (model.Id == null)
                        {
                            model.Id = userId;

                            string newUserName = model.UserName;

                            //When updating username of logged user, we need to remove the claimIdentity of logged userName, and
                            //then add new claimIdentity with the updated username
                            var identity = new ClaimsIdentity(User.Identity);
                            identity.RemoveClaim(identity.FindFirst(identity.NameClaimType));
                            identity.AddClaim(new Claim(identity.NameClaimType, newUserName));
                            AuthenticationManager.AuthenticationResponseGrant = new AuthenticationResponseGrant
                                (new ClaimsPrincipal(identity), new AuthenticationProperties { IsPersistent = false });
                        }
                    }

                    ApplicationUser user = UserManager.FindById(model.Id);
                    user.UserName = model.UserName;
                    user.Name = model.Name;
                    user.MiddleName = model.MiddleName;
                    user.Email = model.Email;
                    user.LastName = model.LastName;

                    //Hashing received password from the model
                    if (model.ConfirmPassword != null)
                    {
                        var newPasswordHash = UserManager.PasswordHasher.HashPassword(model.ConfirmPassword);
                        user.PasswordHash = newPasswordHash;
                    }

                    //Create directory with attached photo saved in into the directory
                    if (model.Photo != null)
                    {

                        var fileName = model.UserName + ".png";
                        var path = Path.Combine(Server.MapPath("~/Images/Users/"), fileName);
                        var pathToResized = Path.Combine(Server.MapPath("~/Images/Users/"), "resized-" + fileName);
                        if (System.IO.File.Exists(path))
                        {
                            System.IO.File.Delete(path);
                        }
                        if (System.IO.File.Exists(pathToResized))
                        {
                            System.IO.File.Delete(pathToResized);
                        }
                        var NewfileName = model.UserName + ".png";
                        var toPath = Path.Combine(Server.MapPath("~/Images/Users/"), NewfileName);
                        var resPathToResized = Path.Combine(Server.MapPath("~/Images/Users/"), "resized-" + NewfileName);
                        model.Photo.SaveAs(toPath);
                        Bitmap resizedImage = resizeImage(30, 30, toPath);
                        resizedImage.Save(resPathToResized);
                    }

                    var update = await UserManager.UpdateAsync(user);
                    res = true;
                }
            }
            catch
            {
                res = false;
            }

            return Json(res, JsonRequestBehavior.AllowGet);
        }

        //---Add received role to user based on received id for user.
        [HttpPost]
        public async Task<ActionResult> AddUserRole(string id, string role)
        {
            var res = false;
            try
            {
                ApplicationUser user = UserManager.FindById(id);
                var result = await UserManager.AddToRolesAsync(user.Id, new string[] { role });

                if (result.Succeeded)
                {
                    res = true;
                }
            }
            catch
            {
                res = false;
            }
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        //---Remove received role to user based on received id for user.
        [HttpPost]
        public async Task<ActionResult> RemoveUserRole(string id, string role)
        {
            var res = false;
            try
            {
                ApplicationUser user = UserManager.FindById(id);
                var result = await UserManager.RemoveFromRolesAsync(user.Id, new string[] { role });

                if (result.Succeeded)
                {
                    res = true;
                }
            }
            catch
            {
                res = false;
            }
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        //---Activate or deactivate user based of received id for user.
        [HttpPost]
        public ActionResult ToggleUpdateActiveUser(string id, bool active)
        {
            using (AbcUEMDbEntities db = new AbcUEMDbEntities())
            {
                return Json(db.UpdateActiveUser(id, active), JsonRequestBehavior.AllowGet);
            }
        }

        [AllowAnonymous]
        public ActionResult ForgotPassword()
        {
            return View();
        }

        //---Sending mail for recevied email address from the model
        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult> ForgotPassword(ForgotPasswordViewModel model)
        {
            var res = false;
            try
            {
                if (ModelState.IsValid)
                {
                    var user = await UserManager.FindByNameAsync(GetUserName(model.Email));
                    if (user == null || user.Active == false)
                    {
                        // Don't reveal that the user does not exist or is not confirmed
                        //return View("ForgotPasswordConfirmation");
                        res = false;
                    }
                    else
                    {

                        // For more information on how to enable account confirmation and password reset please visit http://go.microsoft.com/fwlink/?LinkID=320771
                        // Send an email with this link
                        string code = await UserManager.GeneratePasswordResetTokenAsync(user.Id);
                        var callbackUrl = Url.Action("ResetPassword", "Account", new { userId = user.Id, code = code }, protocol: Request.Url.Scheme);
                        string link = String.Format("Please reset your password by clicking <a href=\"{0}\">here</a>", callbackUrl);
                        await UserManager.SendEmailAsync(user.Id, "Reset Password", link);

                        //return RedirectToAction("ForgotPasswordConfirmation", "Account");

                        res = true;
                    }
                }
            }
            catch
            {
                res = false;
            }
            // If we got this far, something failed, redisplay form
            return Json(res, JsonRequestBehavior.AllowGet);
            //return RedirectToAction("Login", "Account"); 
            //return View(model);
        }

        [AllowAnonymous]
        public ActionResult ForgotPasswordConfirmation()
        {
            return View();
        }

        [AllowAnonymous]
        public ActionResult ResetPassword(string code)
        {
            return code == null ? View("Error") : View();
        }

        //---Reset password for user.
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ResetPassword(ResetPasswordViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            var user = await UserManager.FindByNameAsync(GetUserName(model.Email));
            if (user == null)
            {
                ViewBag.Error = "Грешка. Корисникот не постои.";
                return View();
            }

            var result = await UserManager.ResetPasswordAsync(user.Id, model.Code, model.Password);
            if (result.Succeeded)
            {
                //Thread.Sleep(3000);
                return RedirectToAction("Login", "Account");
            }

            AddErrors(result);
            return View();
        }

        [AllowAnonymous]
        public ActionResult ResetPasswordConfirmation()
        {
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public ActionResult ExternalLogin(string provider, string returnUrl)
        {
            // Request a redirect to the external login provider
            return new ChallengeResult(provider, Url.Action("ExternalLoginCallback", "Account", new { ReturnUrl = returnUrl }));
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult> ConfirmEmail(string userId, string code)
        {
            if (userId == null || code == null)
            {
                return View("Error");
            }
            var result = await UserManager.ConfirmEmailAsync(userId, code);
            return View(result.Succeeded ? "ConfirmEmail" : "Error");
        }

        [AllowAnonymous]
        public async Task<ActionResult> SendCode(string returnUrl, bool rememberMe)
        {
            var userId = await SignInManager.GetVerifiedUserIdAsync();
            if (userId == null)
            {
                return View("Error");
            }
            var userFactors = await UserManager.GetValidTwoFactorProvidersAsync(userId);
            var factorOptions = userFactors.Select(purpose => new SelectListItem { Text = purpose, Value = purpose }).ToList();
            return View(new SendCodeViewModel { Providers = factorOptions, ReturnUrl = returnUrl, RememberMe = rememberMe });
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> SendCode(SendCodeViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View();
            }

            // Generate the token and send it
            if (!await SignInManager.SendTwoFactorCodeAsync(model.SelectedProvider))
            {
                return View("Error");
            }
            return RedirectToAction("VerifyCode", new { Provider = model.SelectedProvider, ReturnUrl = model.ReturnUrl, RememberMe = model.RememberMe });
        }

        [AllowAnonymous]
        public async Task<ActionResult> ExternalLoginCallback(string returnUrl)
        {
            var loginInfo = await AuthenticationManager.GetExternalLoginInfoAsync();
            if (loginInfo == null)
            {
                return RedirectToAction("Login");
            }

            // Sign in the user with this external login provider if the user already has a login
            var result = await SignInManager.ExternalSignInAsync(loginInfo, isPersistent: false);
            switch (result)
            {
                case SignInStatus.Success:
                    return RedirectToLocal(returnUrl);
                case SignInStatus.LockedOut:
                    return View("Lockout");
                case SignInStatus.RequiresVerification:
                    return RedirectToAction("SendCode", new { ReturnUrl = returnUrl, RememberMe = false });
                case SignInStatus.Failure:
                default:
                    // If the user does not have an account, then prompt the user to create an account
                    ViewBag.ReturnUrl = returnUrl;
                    ViewBag.LoginProvider = loginInfo.Login.LoginProvider;
                    return View("ExternalLoginConfirmation", new ExternalLoginConfirmationViewModel { Email = loginInfo.Email });
            }
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ExternalLoginConfirmation(ExternalLoginConfirmationViewModel model, string returnUrl)
        {
            if (User.Identity.IsAuthenticated)
            {
                return RedirectToAction("Index", "Manage");
            }

            if (ModelState.IsValid)
            {
                // Get the information about the user from the external login provider
                var info = await AuthenticationManager.GetExternalLoginInfoAsync();
                if (info == null)
                {
                    return View("ExternalLoginFailure");
                }
                var user = new ApplicationUser { UserName = model.Email, Email = model.Email };
                var result = await UserManager.CreateAsync(user);
                if (result.Succeeded)
                {
                    result = await UserManager.AddLoginAsync(user.Id, info.Login);
                    if (result.Succeeded)
                    {
                        await SignInManager.SignInAsync(user, isPersistent: false, rememberBrowser: false);
                        return RedirectToLocal(returnUrl);
                    }
                }
                AddErrors(result);
            }

            ViewBag.ReturnUrl = returnUrl;
            return View(model);
        }

        [AllowAnonymous]
        public async Task<ActionResult> VerifyCode(string provider, string returnUrl, bool rememberMe)
        {
            // Require that the user has already logged in via username/password or external login
            if (!await SignInManager.HasBeenVerifiedAsync())
            {
                return View("Error");
            }
            return View(new VerifyCodeViewModel { Provider = provider, ReturnUrl = returnUrl, RememberMe = rememberMe });
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> VerifyCode(VerifyCodeViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            // The following code protects for brute force attacks against the two factor codes. 
            // If a user enters incorrect codes for a specified amount of time then the user account 
            // will be locked out for a specified amount of time. 
            // You can configure the account lockout settings in IdentityConfig
            var result = await SignInManager.TwoFactorSignInAsync(model.Provider, model.Code, isPersistent: model.RememberMe, rememberBrowser: model.RememberBrowser);
            switch (result)
            {
                case SignInStatus.Success:
                    return RedirectToLocal(model.ReturnUrl);
                case SignInStatus.LockedOut:
                    return View("Lockout");
                case SignInStatus.Failure:
                default:
                    ModelState.AddModelError("", "Invalid code.");
                    return View(model);
            }
        }

        [AllowAnonymous]
        public ActionResult ExternalLoginFailure()
        {
            return View();
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (_userManager != null)
                {
                    _userManager.Dispose();
                    _userManager = null;
                }

                if (_signInManager != null)
                {
                    _signInManager.Dispose();
                    _signInManager = null;
                }
            }

            base.Dispose(disposing);
        }

        #region Helpers
        // Used for XSRF protection when adding external logins
        private const string XsrfKey = "XsrfId";

        private IAuthenticationManager AuthenticationManager
        {
            get
            {
                return HttpContext.GetOwinContext().Authentication;
            }
        }

        private void AddErrors(IdentityResult result)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError("", error);
            }
        }

        private ActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            return RedirectToAction("Index", "Home");
        }

        internal class ChallengeResult : HttpUnauthorizedResult
        {
            public ChallengeResult(string provider, string redirectUri)
                : this(provider, redirectUri, null)
            {
            }

            public ChallengeResult(string provider, string redirectUri, string userId)
            {
                LoginProvider = provider;
                RedirectUri = redirectUri;
                UserId = userId;
            }

            public string LoginProvider { get; set; }
            public string RedirectUri { get; set; }
            public string UserId { get; set; }

            public override void ExecuteResult(ControllerContext context)
            {
                var properties = new AuthenticationProperties { RedirectUri = RedirectUri };
                if (UserId != null)
                {
                    properties.Dictionary[XsrfKey] = UserId;
                }
                context.HttpContext.GetOwinContext().Authentication.Challenge(properties, LoginProvider);
            }

        }
        #endregion
    }
}