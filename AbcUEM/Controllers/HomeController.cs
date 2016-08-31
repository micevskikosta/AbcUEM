﻿using System;
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
                        descriptio = x.DescriptionMk,
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
                        descriptio = x.DescriptionFr,
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
                        uploaded = x.SysDate
                    }).ToList(), JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(db.GalleryMaster.Select(x => new
                    {
                        id = x.Id,
                        title = x.TitleFr,
                        uploaded = x.SysDate
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
                        uploaded = x.SysDate
                    }).ToList(), JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(db.GalleryDetails.Where(x => x.GalleryMasterId == masterId).Select(x => new
                    {
                        id = x.Id,
                        title = x.TitleFr,
                        uploaded = x.SysDate
                    }).ToList(), JsonRequestBehavior.AllowGet);

                }
            }
        }

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

        public ActionResult UpdateCalendarEvent(Calendar item)
        {
            bool res = true;
            try
            {
                using (AbcUEMDbEntities db = new AbcUEMDbEntities())
                {
                    var obj = db.Calendar.Find(item.Id);
                    obj.start = item.start;
                    obj.end = item.end;
                    db.SaveChanges();
                }
            }
            catch
            {
                res = false;
            }
            return Json(res, JsonRequestBehavior.AllowGet);
        }

    }
}