﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using LMS.Core.Entities;
using MySql.Data.MySqlClient;

namespace LMS.DAL
{
    public class InvoiceDAL
    {
        #region DbOperations
        public bool ManageInvoice(InvoiceDE _inv, MySqlCommand? cmd)
        {
            bool closeConnection = false;
            try
            {
                if (cmd == null)
                {
                    cmd = LMSDataContext.OpenMySqlConnection();
                    closeConnection = true;
                }
                cmd.CommandText = "Manage_Invoice";

                cmd.Parameters.AddWithValue("prm_Id", _inv.Id);
                cmd.Parameters.AddWithValue("prm_CustomerId", _inv.CustomerId);
                cmd.Parameters.AddWithValue("prm_InvDate", _inv.InvDate);
                cmd.Parameters.AddWithValue("prm_invNo", _inv.InvNo);
                cmd.Parameters.AddWithValue("prm_invAmount", _inv.InvAmount);
                cmd.Parameters.AddWithValue("prm_comments", _inv.Comments);
                cmd.Parameters.AddWithValue("prm_createdOn", _inv.CreatedOn);
                cmd.Parameters.AddWithValue("prm_createdById", _inv.CreatedById);
                cmd.Parameters.AddWithValue("prm_modifiedOn", _inv.ModifiedOn);
                cmd.Parameters.AddWithValue("prm_modifiedById", _inv.ModifiedById);
                cmd.Parameters.AddWithValue("prm_isActive", _inv.IsActive);
                cmd.Parameters.AddWithValue("prm_dbOperation", _inv.DBoperation.ToString());
                cmd.ExecuteNonQuery();
                return true;
            }
            catch (Exception)
            {

                throw;
            }
            finally
            {
                if (closeConnection)
                    LMSDataContext.CloseMySqlConnection(cmd);
            }
        }
        public List<InvoiceDE> SearchInvoice(string WhereClause, MySqlCommand cmd)
        {
            bool closeConnection = false;
            //WhereClause = string.Empty;
            List<InvoiceDE> lec = new List<InvoiceDE>();
            try
            {
                if (cmd == null)
                {
                    cmd = LMSDataContext.OpenMySqlConnection();
                    closeConnection = true;
                }
                lec = cmd.Connection.Query<InvoiceDE>("call lms.Search_Invoice('" + WhereClause + "')").ToList();
                return lec;
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                if (closeConnection)
                    LMSDataContext.CloseMySqlConnection(cmd);
            }
        }
        #endregion
    }
}
