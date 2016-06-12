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

        public ActionResult Translate(Enums.Pages page, Languages lang, string tagId)
        {
            using(AbcUEMDbEntities db = new AbcUEMDbEntities())
            {
                if (lang == Languages.Mk)
                {

                    return Json(db.GetTranslate((int)page, tagId).ToList().Select(x => new {
                        Title = x.TitleMk,
                        Description = x.DescriptionMk,
                        ImgPath = x.ImgPath
                    }), JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(db.GetTranslate((int)page, tagId).ToList().Select(x => new {
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
                    return Json(db.Calendar.Select(x => new {
                        id = x.Id,
                        title = x.TitleMk,
                        descriptio = x.DescriptionMk,
                        start = x.start,
                        end = x.end
                    }).ToList(), JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(db.Calendar.Select(x => new {
                        id = x.Id,
                        title = x.TitleFr,
                        descriptio = x.DescriptionFr,
                        start = x.start,
                        end = x.end
                    }).ToList(), JsonRequestBehavior.AllowGet);

                }

            }
        }
    }
}