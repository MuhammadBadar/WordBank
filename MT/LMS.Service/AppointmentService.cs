using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LMS.Core.Entities;
using LMS.Core.Enums;
using LMS.DAL;
using MySql.Data.MySqlClient;
using NLog;

namespace LMS.Service
{
    public class AppointmentService
    {
        #region Class Variables
        private AppointmentDAL _apptDAL;
        private CoreDAL _coreDAL;
        private Logger _logger;
        #endregion
        #region Constructor
        public AppointmentService()
        {
            _apptDAL = new AppointmentDAL();
            _coreDAL = new CoreDAL();
            _logger = LogManager.GetLogger("fileLogger");
        }
        #endregion
        #region 
        public bool ManageAppointment(AppointmentDE _appt)
        {
            bool retVal = false;
            bool closeConnectionFlag = false;
            MySqlCommand? cmd = null;
            try
            {
                cmd = LMSDataContext.OpenMySqlConnection();
                closeConnectionFlag = true;

                if (_appt.DBoperation == DBoperations.Insert)
                    _appt.Id = _coreDAL.GetnextId(TableNames.Appointment.ToString());
                retVal = _apptDAL.ManageAppointment(_appt, cmd);
                return retVal;
            }
            catch (Exception ex)
            {
                _logger.Error(ex);
                throw;
            }
            finally
            {
                if (closeConnectionFlag)
                    LMSDataContext.CloseMySqlConnection(cmd);
            }
        }
        public List<AppointmentDE> SearchAppointment(AppointmentDE _appt)
        {
            List<AppointmentDE> retVal = new List<AppointmentDE>();
            bool closeConnectionFlag = false;
            MySqlCommand? cmd = null;
            try
            {
                cmd = LMSDataContext.OpenMySqlConnection();
                closeConnectionFlag = true;
                string WhereClause = " Where 1=1";
                if (_appt.Id != default)
                    WhereClause += $" AND Id={_appt.Id}";
                if (_appt.InquiryId != default)
                    WhereClause += $" and InquiryId  like ''" + _appt.InquiryId + "''";
                if (_appt.StatusId != default)
                    WhereClause += $" and StatusId like ''" + _appt.StatusId + "''";
                if (_appt.NextApptDate != default)
                    WhereClause += $" and NextApptDate like ''" + _appt.NextApptDate + "''";
                if (_appt.Comment != default)
                    WhereClause += $" and Comment like ''" + _appt.Comment + "''";
                if (_appt.IsActive != default && _appt.IsActive == true)
                    WhereClause += $" AND IsActive=1";


                retVal = _apptDAL.SearchAppointment(WhereClause, cmd);
                return retVal;
            }
            catch (Exception ex)
            {
                _logger.Error(ex);
                throw;
            }
            finally
            {
                if (closeConnectionFlag)
                    LMSDataContext.CloseMySqlConnection(cmd);
            }
        }
        #endregion
    }
}
