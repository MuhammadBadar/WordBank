﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LMS.Core.Enums;
using LMS.DAL;
using MySql.Data.MySqlClient;
using NLog;
using LMS.Core.Entities.Inquiry;
using LMS.DAL.Inquiry;
using System.Data;
using K4os.Hash.xxHash;
using LMS.Core.Constants;

using static Dapper.SqlMapper;

namespace LMS.Service.Inquiry
{
    public partial class InqService 
    {
     

        public FollowUpDE ManageFollowUp(FollowUpDE mod)
        {
            bool closeConnectionFlag = false;
            try
            {
                _entity = TableNames.INQ_FollowUp.ToString();
                if (cmd == null || cmd.Connection.State != ConnectionState.Open)
                {
                    cmd = LMSDataContext.OpenMySqlConnection();
                    closeConnectionFlag = true;
                }
                if (mod.DBoperation == DBoperations.Insert)
                    mod.Id = _coreDAL.GetnextId(_entity);



                if (_inqDAL.INQ_Manage_FollowUp(mod, cmd))
                {
                    mod.AddSuccessMessage(string.Format(AppConstants.CRUD_DB_OPERATION, _entity, mod.DBoperation.ToString()));
                    _logger.Info($"Success: " + string.Format(AppConstants.CRUD_DB_OPERATION, _entity, mod.DBoperation.ToString()));
                }
                else
                {
                    mod.AddErrorMessage(string.Format(AppConstants.CRUD_ERROR, _entity));
                    _logger.Info($"Error: " + string.Format(AppConstants.CRUD_ERROR, _entity));
                }
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
            return mod;
        }
        public List<FollowUpDE> SearchFollowUp(FollowUpDE mod)
        {
            List<FollowUpDE> FollowUp = new List<FollowUpDE>();
            bool closeConnectionFlag = false;
            try
            {
                if (cmd == null || cmd.Connection.State != ConnectionState.Open)
                {
                    cmd = LMSDataContext.OpenMySqlConnection();
                    closeConnectionFlag = true;
                }
                #region Search

                string Whereclause = " Where 1=1";
                if (mod.Id != default)
                    Whereclause += $" and id={mod.Id}";
                if (mod.StatusId != default)
                    Whereclause += $" and StatusId like ''" + mod.StatusId + "''";
                if (mod.InquiryId != default)
                    Whereclause += $" and InquiryId  like ''" + mod.InquiryId + "''";
                if (mod.Date != default)
                    Whereclause += $" and Date like ''" + mod.Date + "''";
                if (mod.NextAppointmentDate != default)
                    Whereclause += $" and NextAppointmentDate like ''" + mod.NextAppointmentDate + "''";
                if (mod.Comment != default)
                    Whereclause += $" and Comment like ''" + mod.Comment + "''";
                if (mod.IsActive != default && mod.IsActive == true)
                    Whereclause += $" and IsActive=1";

                FollowUp = _inqDAL.INQ_Search_FollowUp(Whereclause, cmd);

                #endregion
            }
            catch (Exception exp)
            {
                _logger.Error(exp);
                throw;
            }
            finally
            {
                if (closeConnectionFlag)
                    LMSDataContext.CloseMySqlConnection(cmd);
            }
            return FollowUp;
        }

    }
}
