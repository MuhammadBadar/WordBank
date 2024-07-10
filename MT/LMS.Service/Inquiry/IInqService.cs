using LMS.Core.Entities.Inquiry;


namespace LMS.Service.Inquiry
{
    public interface IInqService
    { 
        public InquiryDE ManageInquiry(InquiryDE mod );
        public List<InquiryDE> SearchInquiry(InquiryDE mod);

        public ServicesDE ManageServices(ServicesDE mod);
        public List<ServicesDE> SearchServices(ServicesDE mod);



        public ServiceOutlineDE ManageServiceOutline (ServiceOutlineDE mod);
        public List<ServiceOutlineDE> SearchServiceOutline (ServiceOutlineDE mod);

        public FollowUpDE ManageFollowUp(FollowUpDE mod);
        public List<FollowUpDE> SearchFollowUp(FollowUpDE mod);







    }
}
