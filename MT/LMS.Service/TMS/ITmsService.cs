using LMS.Core.Entities.TMS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LMS.Service.TMS
{
    public interface ITmsService
    {
        public NotificationTemplateDE ManageNotificationTemplate (NotificationTemplateDE mod);
        public List<NotificationTemplateDE> SearchNotificationTemplate (NotificationTemplateDE mod);





    }
}

