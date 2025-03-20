import React from 'react'

function PrescriptionPreview({ patientInfo, formData }: { patientInfo: any, formData: any }) {
  return (
    <>
      <div className="w-2/3 bg-white p-6 rounded-lg m-4 ml-0 shadow-lg">
        {/* Header Section */}
        <header className="mb-6 border-b pb-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Left side - Bengali */}
            <div className="space-y-1">
              <h1 className="text-xl font-semibold text-purple-600">
                ডাঃ সোহেল সিদ্দিকী
              </h1>
              <div className="space-y-0.5 text-sm text-slate-600">
                <p>এমবিবিএস, বিসিএস (স্বাস্থ্য),</p>
                <p>এম ডি (কার্ডিওলজি), নি সি ভি ডি (ডায়াবেটিস)</p>
                <p>জাতীয় হৃদরোগ ইনস্টিটিউট, ঢাকা</p>
              </div>
            </div>

            {/* Right side - English */}
            <div className="space-y-1 text-right">
              <h1 className="text-xl font-semibold text-purple-600">
                Dr. Sohel Siddike
              </h1>
              <div className="space-y-0.5 text-sm text-slate-600">
                <p>MBBS, BCS (Health)</p>
                <p>MD (Cardiology) NICVD, CCD (Diabetes)</p>
                <p className="text-red-500">Intervention Cardiologist</p>
                <p className="text-blue-500">
                  Chittagong Medical College Hospital
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Patient Info */}
        <div className="mb-6 grid grid-cols-4 gap-4 text-sm">
          <div className="col-span-2">
            <span className="font-medium text-slate-700">Name: </span>
            <span>{patientInfo.name}</span>
          </div>
          <div>
            <span className="font-medium text-slate-700">Age: </span>
            <span>{patientInfo.age}</span>
          </div>
          <div>
            <span className="font-medium text-slate-700">Date: </span>
            <span>{patientInfo.date}</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-4">
          {/* Diagnosis */}
          <div>
            <h2 className="font-medium text-slate-700">Dx-</h2>
            <div className="whitespace-pre-wrap">{formData.diagnosis}</div>
          </div>

          {/* Clinical Complaints */}
          <div>
            <h2 className="font-medium text-slate-700">Clinical Complaints:</h2>
            <div className="whitespace-pre-wrap">{formData.complaints}</div>
          </div>

          {/* Risk Factors */}
          <div>
            <h2 className="font-medium text-slate-700">Risk Factors:</h2>
            {Object.entries(formData.riskFactors).map(([key, value]) => (
              <div key={key} className="flex gap-2">
                <span className="font-medium">{key.toUpperCase()}-</span>
                <span>{value}</span>
              </div>
            ))}
          </div>

          {/* Investigations */}
          <div>
            <h2 className="font-medium text-slate-700">Investigations:</h2>
            <div className="flex flex-wrap gap-2">
              {formData.selectedInvestigations.map((inv, index) => (
                <span key={index} className="bg-slate-50 px-2 py-1 rounded">
                  {inv}
                </span>
              ))}
            </div>
          </div>

          {/* Medication Grid */}
          <div>
            <h2 className="font-medium text-slate-700">Rx</h2>
            <div className="overflow-x-auto">
              <table className="w-full border border-slate-300">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="border-r border-slate-300 p-2 text-center">Medicine</th>
                    <th className="border-r border-slate-300 p-2 text-center">Schedule</th>
                    <th className="border-r border-slate-300 p-2 text-center">Meal Time</th>
                    <th className="border-r border-slate-300 p-2 text-center">Duration</th>
                    <th className="p-2 text-center">Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.medications.map((med, index) => (
                    <tr key={index}>
                      <td className="border-r border-t border-slate-300 p-2">{med.medicine}</td>
                      <td className="border-r border-t border-slate-300 p-2 text-center">{med.schedule}</td>
                      <td className="border-r border-t border-slate-300 p-2 text-center">{med.mealTime}</td>
                      <td className="border-r border-t border-slate-300 p-2 text-center">
                        {med.duration} {med.durationType}
                      </td>
                      <td className="border-t border-slate-300 p-2">{med.remarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Doctor's Notes */}
          {formData.notes && (
            <div>
              <h2 className="font-medium text-slate-700">{`Doctor's Notes:`}</h2>
              <div className="whitespace-pre-wrap text-slate-600">
                {formData.notes}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-8 border-t pt-4 text-sm text-slate-600">
          <div className="flex justify-between">
            <div>
              <p>প্রতি কনসাল্ট ভিজিট ৫ টা থেকে - রাত ৮ টা</p>
              <p>Contact: 01940-233638, 01940-233639</p>
            </div>
            <div className="text-right">
              <p>প্রতিদিন বিকাল ৫টা থেকে রাত ১০টা</p>
              <p>Room No. - 519</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export default PrescriptionPreview