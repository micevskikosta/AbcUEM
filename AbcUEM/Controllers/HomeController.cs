using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AbcUEM.Models;
using AbcUEM.Enums;

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

        public ActionResult Translate(Enums.Pages page, Languages lang)
        {
            using(AbcUEMDbEntities db = new AbcUEMDbEntities())
            {
                if (lang == Languages.Mk)
                {
                    return Json(db.GetTranslate((int)page).ToList().Select(x=> new {
                        Name = x.NameMk
                    }), JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(db.GetTranslate((int)page).ToList().Select(x => new {
                        Name = x.NameFr
                    }), JsonRequestBehavior.AllowGet);
                }
                
            }
        }
    }
}