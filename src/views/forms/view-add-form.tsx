export default function ViewAddForm() {
  return (
    <div className="flex justify-center min-h-screen p-10 bg-gray-50">
      <div className="w-full max-w-xl space-y-6">
        
        {/* Page Header Card */}
        <div className="bg-white tracking-normal text-[#222831] border border-[#222831]/15 rounded-lg shadow-sm">
          <div className="p-6">
            <h1 className="text-2xl font-semibold">Create New Feedback Form</h1>
            <p className="text-base font-normal text-[#545454] mt-2">
              Set up a new feedback collection form for your faculty or department.
            </p>
          </div>
        </div>

        {/* Add Form Card */}
        <form className="space-y-6">
          <div className="bg-white border border-[#222831]/15 rounded-lg shadow-sm overflow-hidden">
            {/* Title & Description Section */}
            <div className="p-6 space-y-6">
              {/* Title Input */}
              <div>
                <label htmlFor="title" className="block text-base font-semibold text-[#222831] mb-2">
                  Form Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  placeholder="e.g., End of Semester Faculty Feedback"
                  className="w-full text-2xl font-semibold px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:bg-amber-50 transition"
                />
              </div>

              {/* Divider */}
              <div className="border-t border-[#222831]/10"></div>

              {/* Description Input */}
              <div>
                <label htmlFor="description" className="block text-base font-semibold text-[#222831] mb-2">
                  Description <span className="text-gray-500 text-sm font-normal">(Optional)</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  placeholder="Provide context or instructions for respondents (e.g., This feedback will help us improve teaching quality...)"
                  className="w-full px-4 py-3 bg-gray-100 rounded-lg resize-none focus:outline-none focus:bg-amber-50 transition"
                ></textarea>
              </div>
            </div>

            {/* Footer with Buttons */}
            <div className="border-t border-[#222831]/15 bg-gray-50 px-6 py-4 flex justify-between items-center">
              <div className="text-sm text-[#545454]">
                All fields marked with <span className="text-red-500">*</span> are required.
              </div>
              <div className="space-x-4">
                <button
                  type="button"
                  className="text-[#545454] hover:text-amber-600 text-sm font-medium transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium py-2 px-8 rounded-lg shadow transition"
                >
                  Create Form
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* Info List (same as submission page) */}
        <div className="bg-white p-6 border border-[#222831]/15 rounded-lg shadow-sm">
          <ul className="list-disc pl-5 text-[#222831] text-base font-normal space-y-2">
            <li>Only verified school users will be able to submit responses.</li>
            <li>Respondents can choose to submit anonymously.</li>
            <li>You can view and export all responses later from the dashboard.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}