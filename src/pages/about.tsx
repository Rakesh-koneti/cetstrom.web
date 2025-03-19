export function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">About CETStrom</h1>
        <div className="prose prose-blue">
          <p className="text-lg text-gray-600 mb-6">
            CETStrom is your comprehensive preparation platform for the AP EAMCET examination.
            We provide a realistic exam environment with carefully curated questions to help
            you succeed in your engineering and medical entrance tests.
          </p>
          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-6">
            To provide quality education and exam preparation resources accessible to all
            students, helping them achieve their dreams of pursuing engineering and medical
            careers.
          </p>
          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            What We Offer
          </h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>Daily practice tests for consistent preparation</li>
            <li>Weekly mock exams to test your progress</li>
            <li>Monthly full-length tests simulating actual exam conditions</li>
            <li>Detailed performance analytics and improvement suggestions</li>
            <li>Subject-wise question banks and practice materials</li>
          </ul>
        </div>
      </div>
    </div>
  );
}