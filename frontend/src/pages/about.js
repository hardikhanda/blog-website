import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

function About() {
  return (
    <>
      <Navbar />
      <section className="text-gray-400 bg-gray-900 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-2/3 flex flex-col sm:flex-row sm:items-center items-start mx-auto">
            <div className="flex-grow sm:pl-10">
              <h1 className="title-font font-medium text-3xl text-white mb-4">
                About PEC Pulse
              </h1>
              <p className="leading-relaxed mb-8">
                Welcome to PEC Pulse, your online hub for connecting, learning, and growing together within the PEC community. Whether you're a student, faculty member, or alumni of PEC, this platform is designed to foster collaboration and knowledge-sharing among all members.
              </p>
              <h2 className="title-font font-medium text-2xl text-white mb-4">
                Our Story
              </h2>
              <p className="leading-relaxed mb-8">
                Founded with a passion for enhancing collaboration and learning within PEC, PEC Pulse was established in [Year] by a group of enthusiastic students and faculty members. Our mission is to provide a platform where every member of the PEC community can freely interact, share knowledge, and inspire each other to reach new heights.
              </p>
              <h2 className="title-font font-medium text-2xl text-white mb-4">
                Our Values
              </h2>
              <p className="leading-relaxed mb-8">
                At PEC Pulse, we are driven by the values of inclusivity, collaboration, and continuous learning. We believe in creating a supportive environment where everyone's voice is heard and valued. Our platform encourages respectful discussions, knowledge exchange, and personal growth.
              </p>
              <h2 className="title-font font-medium text-2xl text-white mb-4">
                Meet Our Team
              </h2>
              <div className="flex flex-wrap -m-4">
                <div className="p-4 sm:w-1/2">
                  <div className="bg-gray-800 bg-opacity-50 rounded-lg p-8">
                    <h3 className="text-white text-lg font-medium title-font mb-5">Founder & CEO</h3>
                    <p className="leading-relaxed mb-4">
                      [Your Name]
                      [Brief description of your background and vision for PEC Pulse]
                    </p>
                  </div>
                </div>
                <div className="p-4 sm:w-1/2">
                  <div className="bg-gray-800 bg-opacity-50 rounded-lg p-8">
                    <h3 className="text-white text-lg font-medium title-font mb-5">Co-founder</h3>
                    <p className="leading-relaxed mb-4">
                      [Co-founder's Name]
                      [Brief description of their role and contributions]
                    </p>
                  </div>
                </div>
              </div>
              <h2 className="title-font font-medium text-2xl text-white mb-4">
                What We Offer
              </h2>
              <ul className="list-disc pl-4 mb-8">
                <li>Interactive Blogging: Share your insights, experiences, and ideas with the community through our blogging platform.</li>
                <li>Discussion Forums: Engage in discussions on various topics ranging from academics to extracurricular activities.</li>
                <li>Networking Opportunities: Connect with fellow students, faculty, and alumni to expand your professional network.</li>
                <li>Resource Sharing: Access educational resources, study materials, and project ideas contributed by your peers.</li>
              </ul>
              <h2 className="title-font font-medium text-2xl text-white mb-4">
                Our Community
              </h2>
              <p className="leading-relaxed mb-8">
                Our community is diverse, comprising students, faculty, and alumni of PEC. Whether you're seeking academic advice, career guidance, or simply want to connect with like-minded individuals, PEC Pulse is your go-to platform.
              </p>
              <h2 className="title-font font-medium text-2xl text-white mb-4">
                Get Involved
              </h2>
              <p className="leading-relaxed mb-8">
                Join the PEC Pulse community today and start exploring the opportunities to learn, grow, and contribute. Connect with us on social media, participate in discussions, and share your valuable insights with the PEC community.
              </p>
              <h2 className="title-font font-medium text-2xl text-white mb-4">
                Contact Us
              </h2>
              <p className="leading-relaxed mb-8">
                Have questions or feedback? We'd love to hear from you! Reach out to us via email at [Your Email] or connect with us on [Social Media Handles].
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default About;
