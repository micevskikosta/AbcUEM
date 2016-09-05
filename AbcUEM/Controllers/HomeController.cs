using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AbcUEM.Models;
using AbcUEM.Enums;
using System.IO;

namespace AbcUEM.Controllers
{

    public class HomeController : Controller
    {

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            return View();
        }

        public ActionResult Contact()
        {
            return View();
        }

        public ActionResult Schools()
        {
            return View();
        }

        public ActionResult Galery()
        {
            return View();
        }

        public ActionResult Calendar()
        {
            return View();
        }

        public ActionResult Info()
        {
            return View();
        }

        public ActionResult Translate(Enums.Pages page, Languages lang, string tagId)
        {
            using (AbcUEMDbEntities db = new AbcUEMDbEntities())
            {
                if (lang == Languages.Mk)
                {

                    return Json(db.GetTranslate((int)page, tagId).ToList().Select(x => new
                    {
                        Id = x.Id,
                        Title = x.TitleMk,
                        Description = x.DescriptionMk,
                        ImgPath = x.ImgPath
                    }), JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(db.GetTranslate((int)page, tagId).ToList().Select(x => new
                    {
                        Id = x.Id,
                        Title = x.TitleFr,
                        Description = x.DescriptionFr,
                        ImgPath = x.ImgPath
                    }), JsonRequestBehavior.AllowGet);
                }

            }
        }

        public ActionResult CalendarEvents(Languages lang)
        {
            using (AbcUEMDbEntities db = new AbcUEMDbEntities())
            {
                if (lang == Languages.Mk)
                {
                    return Json(db.Calendar.Select(x => new
                    {
                        id = x.Id,
                        title = x.TitleMk,
                        description = x.DescriptionMk.Equals(null) ? "" : x.DescriptionMk,
                        start = x.start,
                        end = x.end
                    }).ToList(), JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(db.Calendar.Select(x => new
                    {
                        id = x.Id,
                        title = x.TitleFr,
                        description = x.DescriptionFr.Equals(null) ? "" : x.DescriptionFr,
                        start = x.start,
                        end = x.end
                    }).ToList(), JsonRequestBehavior.AllowGet);

                }

            }
        }

        public ActionResult GalleryMaster(Languages lang)
        {
            using (AbcUEMDbEntities db = new AbcUEMDbEntities())
            {
                if (lang == Languages.Mk)
                {
                    return Json(db.GalleryMaster.Select(x => new
                    {
                        id = x.Id,
                        title = x.TitleMk,
                        uploaded = x.SysDate,
                        x.TitleFr,
                        x.TitleMk
                    }).ToList(), JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(db.GalleryMaster.Select(x => new
                    {
                        id = x.Id,
                        title = x.TitleFr,
                        uploaded = x.SysDate,
                        x.TitleFr,
                        x.TitleMk
                    }).ToList(), JsonRequestBehavior.AllowGet);

                }
            }
        }

        public ActionResult GalleryDetails(int masterId, Languages lang)
        {
            using (AbcUEMDbEntities db = new AbcUEMDbEntities())
            {
                if (lang == Languages.Mk)
                {
                    return Json(db.GalleryDetails.Where(x => x.GalleryMasterId == masterId).Select(x => new
                    {
                        id = x.Id,
                        title = x.TitleMk,
                        uploaded = x.SysDate,
                        x.TitleFr,
                        x.TitleMk
                    }).ToList(), JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(db.GalleryDetails.Where(x => x.GalleryMasterId == masterId).Select(x => new
                    {
                        id = x.Id,
                        title = x.TitleFr,
                        uploaded = x.SysDate,
                        x.TitleFr,
                        x.TitleMk
                    }).ToList(), JsonRequestBehavior.AllowGet);

                }
            }
        }

        [Authorize]
        public ActionResult AddContent(Translates item)
        {
            bool res = true;
            try
            {
                using (AbcUEMDbEntities db = new AbcUEMDbEntities())
                {
                    db.Translates.Add(item);
                    db.SaveChanges();
                }
            }
            catch
            {
                res = false;
            }
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        [Authorize]
        public ActionResult UpdateContent(Translates item)
        {
            bool res = true;
            try
            {
                using (AbcUEMDbEntities db = new AbcUEMDbEntities())
                {
                    var obj = db.Translates.Find(item.Id);
                    db.Entry(obj).CurrentValues.SetValues(item);
                    db.SaveChanges();
                }
            }
            catch
            {
                res = false;
            }
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetContent(Translates item)
        {
            using (AbcUEMDbEntities db = new AbcUEMDbEntities())
            {
                return Json(db.Translates.Where(x => x.Id == item.Id).FirstOrDefault(), JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize]
        public ActionResult DeleteContent(Translates item)
        {
            using (AbcUEMDbEntities db = new AbcUEMDbEntities())
            {
                bool res = true;
                try
                {
                    db.Translates.Remove(db.Translates.Find(item.Id));
                    db.SaveChanges();
                }
                catch
                {
                    res = false;
                }
                return Json(res, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize]
        public ActionResult SaveCalendarEvent(Calendar item)
        {
            bool res = true;
            try
            {
                using (AbcUEMDbEntities db = new AbcUEMDbEntities())
                {
                    db.Calendar.Add(item);
                    db.SaveChanges();
                }
            }
            catch
            {
                res = false;
            }
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        [Authorize]
        public ActionResult UpdateCalendarEvent(Calendar item)
        {
            bool res = true;
            try
            {
                using (AbcUEMDbEntities db = new AbcUEMDbEntities())
                {
                    if (item.start == null || item.end == null)
                    {
                        var obj = db.Calendar.Find(item.Id);
                        obj.TitleFr = item.TitleFr;
                        obj.TitleMk = item.TitleMk;
                        obj.DescriptionFr = item.DescriptionFr;
                        obj.DescriptionMk = item.DescriptionMk;
                        db.SaveChanges();
                    }
                    else
                    {
                        var obj = db.Calendar.Find(item.Id);
                        obj.start = item.start;
                        obj.end = item.end;
                        db.SaveChanges();
                    }
                }
            }
            catch
            {
                res = false;
            }
            return Json(res, JsonRequestBehavior.AllowGet);
        }


        [Authorize]
        public ActionResult DeleteCalendarEvent(Calendar item)
        {
            bool res = true;
            try
            {
                using (AbcUEMDbEntities db = new AbcUEMDbEntities())
                {
                    db.Calendar.Remove(db.Calendar.Find(item.Id));
                    db.SaveChanges();
                }
            }
            catch
            {
                res = false;
            }
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetCalendarEvent(Calendar item)
        {
            using (AbcUEMDbEntities db = new AbcUEMDbEntities())
            {
                return Json(db.Calendar.Where(x => x.Id == item.Id).FirstOrDefault(), JsonRequestBehavior.AllowGet);
            }
        }


        [Authorize]
        public ActionResult SaveGaleryImage(GalleryMaster item)
        {
            bool res = true;
            try
            {
                using (AbcUEMDbEntities db = new AbcUEMDbEntities())
                {
                    if (!Directory.Exists(Server.MapPath("~/Images/Gallery/Master")))
                    {
                        Directory.CreateDirectory(Server.MapPath("~/Images/Gallery/Master"));
                    }

                    HttpPostedFileBase file = Request.Files[0];

                    var i = db.GalleryMaster.Add(item);
                    db.SaveChanges();
                    string extension = Path.GetExtension(file.FileName);

                    var path = Path.Combine(Server.MapPath("~/Images/Gallery/Master/"), i.Id + ".jpg");

                    file.SaveAs(path);
                }
            }
            catch
            {
                res = false;
            }
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        [Authorize]
        public ActionResult UpdateGaleryImage(GalleryMaster item)
        {
            bool res = true;
            try
            {
                using (AbcUEMDbEntities db = new AbcUEMDbEntities())
                {

                    HttpPostedFileBase file = Request.Files[0];
                    if (file.ContentLength > 0)
                    {
                        var path = Server.MapPath("~/Images/Gallery/Master/" + item.Id + ".jpg");
                        if (System.IO.File.Exists(path))
                        {
                            System.IO.File.Delete(path);
                        }
                        file.SaveAs(path);
                    }

                    var obj = db.GalleryMaster.Find(item.Id);
                    db.Entry(obj).CurrentValues.SetValues(item);
                    db.SaveChanges();
                }
            }
            catch
            {
                res = false;
            }
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        [Authorize]
        public ActionResult DeleteGalery(GalleryMaster item)
        {
            bool res = true;
            try
            {
                using (AbcUEMDbEntities db = new AbcUEMDbEntities())
                {
                    db.GalleryMaster.Remove(db.GalleryMaster.Find(item.Id));
                    var pathMaster = Server.MapPath("~/Images/Gallery/Master/" + item.Id + ".jpg");
                    if (System.IO.File.Exists(pathMaster))
                    {
                        System.IO.File.Delete(pathMaster);
                    }
                    foreach (var i in db.GalleryDetails.Where(x=>x.GalleryMasterId == item.Id))
                    {
                        var pathDetails = Server.MapPath("~/Images/Gallery/Details/" + i.Id + ".jpg");
                        if (System.IO.File.Exists(pathDetails))
                        {
                            System.IO.File.Delete(pathDetails);
                        }
                        db.GalleryDetails.Remove(db.GalleryDetails.Find(i.Id));
                    }
                    db.SaveChanges();
                }
            }
            catch
            {
                res = false;
            }
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        [Authorize]
        public ActionResult SaveImages(GalleryDetails item)
        {
            bool res = true;
            try
            {
                using (AbcUEMDbEntities db = new AbcUEMDbEntities())
                {
                    if (!Directory.Exists(Server.MapPath("~/Images/Gallery/Details")))
                    {
                        Directory.CreateDirectory(Server.MapPath("~/Images/Gallery/Details"));
                    }

                    HttpPostedFileBase file = Request.Files[0];

                    var i = db.GalleryDetails.Add(item);
                    db.SaveChanges();
                    string extension = Path.GetExtension(file.FileName);

                    var path = Path.Combine(Server.MapPath("~/Images/Gallery/Details/"), i.Id + ".jpg");

                    file.SaveAs(path);
                }
            }
            catch
            {
                res = false;
            }
            return Json(item.GalleryMasterId, JsonRequestBehavior.AllowGet);
        }

        [Authorize]
        public ActionResult UpdateSubGaleryImage(GalleryDetails item)
        {
            bool res = true;
            try
            {
                using (AbcUEMDbEntities db = new AbcUEMDbEntities())
                {

                    HttpPostedFileBase file = Request.Files[0];
                    if (file.ContentLength > 0)
                    {
                        var path = Server.MapPath("~/Images/Gallery/Details/" + item.Id + ".jpg");
                        if (System.IO.File.Exists(path))
                        {
                            System.IO.File.Delete(path);
                        }
                        file.SaveAs(path);
                    }

                    var obj = db.GalleryDetails.Find(item.Id);
                    db.Entry(obj).CurrentValues.SetValues(item);
                    db.SaveChanges();
                }
            }
            catch
            {
                res = false;
            }
            return Json(item.GalleryMasterId, JsonRequestBehavior.AllowGet);
        }

        [Authorize]
        public ActionResult DeleteImage(GalleryDetails item)
        {
            bool res = true;
            try
            {
                using (AbcUEMDbEntities db = new AbcUEMDbEntities())
                {
                    db.GalleryDetails.Remove(db.GalleryDetails.Find(item.Id));
                    var pathMaster = Server.MapPath("~/Images/Gallery/Details/" + item.Id + ".jpg");
                    if (System.IO.File.Exists(pathMaster))
                    {
                        System.IO.File.Delete(pathMaster);
                    }
                    db.SaveChanges();
                }
            }
            catch
            {
                res = false;
            }
            return Json(item.GalleryMasterId, JsonRequestBehavior.AllowGet);
        }

    }
}