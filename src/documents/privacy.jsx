import React, { Component, Fragment } from "react";
import {
  Container,
  Dropdown,
  Icon,
  DropDown,
  Image,
  List,
  Menu,
  Segment,
} from "semantic-ui-react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

class Privacy extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <NavBar />
        <div style={{ padding: 50 }}>
          <Segment style={{ marginTop: 100 }} placeholder>
            <h3 style={{ textAlign: "center" }}>Foodengo - Privacy Policy</h3>
            <h3>Last Updated 19 July 2020</h3>
            <hr></hr>
            <h3>PRIVACY POLICY</h3>

            <p>
              We respect the privacy of our users and every person who visits
              our site <a href="https://www.foodengo.co.uk">www.foodengo.co.uk</a>. Here,{" "}
              <b className="b">SOFTNERGY LIMITED</b> referred to as ("we", "us",
              or "our"). We are committed to protecting your personal
              information and your right to privacy in accordance with General
              Data Protection Regulation (GDPR). If you have any questions or
              concerns about our policy or our practices with regards to your
              personal information, please contact us at
              <a href="https://foodengo.co.uk"> info@foodengo.co.uk.</a>
            </p>
            <p>
              When you visit our website{" "}
              <a href="https://foodengo.co.uk"> www.foodengo.co.uk</a> ("Site"),
              and use our services, you trust us with your personal information.
              We take your privacy very seriously. In this privacy notice, we
              describe our privacy policy. We seek to explain to you in the
              clearest way possible what information we collect, how we use it
              and what rights you have in relation to it. We hope you take some
              time to read through it carefully, as it is important. If there
              are any terms in this privacy policy that you do not agree with,
              please discontinue the use of our site and our services.
            </p>
            <p>
              This privacy policy applies to all information collected through
              our website, and/or any related services, sales, marketing or
              events (we refer to them collectively in this privacy policy as
              the "Site").
            </p>
            <h3>ABOUT US</h3>
            <p>
              At <a href="https://foodengo.co.uk">www.foodengo.co.uk</a>, we
              provide you meticulously designed food delivery ecommerce platform
              where a buyer can buy food products, and Seller (registered) can
              sell their food products online.{" "}
            </p>
            <p>
              With all of our products, we focus on quality by having our
              products subject to rigorous quality checks before it reaches you.
            </p>
            <p>We are located in Edinburgh, United Kingdom.</p>
            <strong>
              Please read this privacy policy carefully as it will help you make
              informed decisions about sharing your personal information with
              us.{" "}
            </strong>
            <h3>1. WHAT INFORMATION DO WE COLLECT?</h3>
            <p>
              Personal information you disclose to us We collect personal
              information that you voluntarily provide to us when expressing an
              interest in obtaining information about us or our products and
              services, when participating in activities on the Site or
              otherwise contacting us.
            </p>
            <p>
              The personal information that we collect depends on the context of
              your interactions with us and the Site, the choices you make and
              the products and features you use. The personal information we
              collect can include the following:
            </p>
            <p>
              <b className="b">Name and Contact Data.</b> We collect your first
              and last name, email address, postal address, phone number and
              other similar contact data.
            </p>
            <p>
              <b className="b">Credentials.</b> We collect passwords, password
              hints, and similar security information used for authentication
              and account access.
            </p>
            <p>
              <b className="b">Payment Data.</b> We collect data necessary to
              process your payment if you make purchases, such as your payment
              instrument number (such as a credit card number), and the security
              code associated with your payment instrument. All payment data is
              stored by our payment processor and you should review its privacy
              policies and contact the payment processor directly to respond to
              your questions.
            </p>
            <p>
              <b className="b">Location information:</b> We will track device
              location by sending GPS coordinates to our application. We may
              also determine location by using other data from your mobile
              device, such as information about wireless networks or cell towers
              near your device. We use and store information about your location
              to enable many product and Service features that are dependent
              upon location tracking. We may also use collected information to
              troubleshoot software, to conduct data analysis, to do testing,
              research, and to monitor and analyze usage and activity trends to
              improve and customize the services.
            </p>
            <h3>Information automatically collected</h3>
            <p>
              We automatically collect certain information when you visit, use
              or navigate the Site. This information does not reveal your
              specific identity (like your name or contact information) but may
              include device and usage information, such as your IP address,
              browser and device characteristics, operating system, language
              preferences, referring URLs, device name, country, location,
              information about how and when you use our Site and other
              technical information.
            </p>
            <p>
              {" "}
              If you access our site with your mobile device, we may
              automatically collect device information (such as your mobile
              device ID, model and manufacturer), operating system, version
              information and IP address. This information is primarily needed
              to maintain the security and operation of our Site, and for our
              internal analytics and reporting purposes. Like many businesses,
              we also collect information through cookies and similar
              technologies. You can find out more about this in our Cookie
              Policy.
            </p>
            <h3>Information collected from other Sources</h3>
            <p>
              We may obtain information about you from other sources, such as
              public databases, joint marketing partners, our newsletters (link
              on our website) are maintained via mailchimp.com, social media
              platforms (such as Facebook), as well as from other third parties.
              Examples of the information we receive from other sources include:
              social media profile information (your name, gender, email, user
              identification numbers for your contacts, profile picture URL and
              any other information that you choose to make public); marketing
              leads and search results and links, including paid listings (such
              as sponsored links).
            </p>
            <h3>2. HOW DO WE USE YOUR INFORMATION?</h3>
            <p>
              We use your personal information for these purposes in reliance on
              our legitimate business interests ("Business Purposes"), in order
              to enter into or perform a contract with you ("Contractual"), with
              your consent ("Consent"), and/or for compliance with our legal
              obligations ("Legal Reasons"). We indicate the specific processing
              grounds we rely on next to each purpose listed below. <br />
              <br />
              We use the information we collect or receive:
              <ul>
                <li>
                  To send administrative information to you for related to your
                  account, our business purposes, and/or for legal reasons. We
                  may use your personal information to send you product, service
                  and new feature information and/or information about changes
                  to our terms, conditions, and policies.
                </li>
                <li>
                  Deliver targeted advertising to you for our Business Purposes
                  and/or with your Consent. We may use your information to
                  develop and display content and advertising (and work with
                  third parties who do so) tailored to your interests and/or
                  location and to measure its effectiveness. [For more
                  information, see our Cookie Policy.
                </li>
                <li>
                  Request Feedback for our Business Purposes and/or with your
                  Consent. We may use your information to request feedback and
                  to contact you about your use of our Site.
                </li>
                <li>
                  To protect our Site for Business Purposes and/or Legal
                  Reasons. We may use your information as part of our efforts to
                  keep our Site safe and secure (for example, for fraud
                  monitoring and prevention).
                </li>
                <li>
                  To enable user-to-user communications with your consent. We
                  may use your information in order to enable user-to-user
                  communications with each user’s consent.
                </li>
                <li>
                  To enforce our terms, conditions and policies for our business
                  purposes and as legally required.
                </li>
                <li>
                  To respond to legal requests and prevent harm as legally
                  required. If we receive a subpoena or other legal request, we
                  may need to inspect the data we hold to determine how to
                  respond.
                </li>
                <li>
                  For other Business Purposes. We may use your information for
                  other Business Purposes, such as data analysis, identifying
                  usage trends, determining the effectiveness of our promotional
                  campaigns and to evaluate and improve our Site, products,
                  services, marketing and your experience.
                </li>
              </ul>
            </p>
            <h3>3. WILL YOUR INFORMATION BE SHARED WITH ANYONE?</h3>
            <p>
              We only share and disclose your information in the following
              situations:
            </p>
            <p>
              <ul>
                <li>
                  Compliance with Laws. We may disclose your information where
                  we are legally required to do so in order to comply with
                  applicable law, governmental requests, a judicial proceeding,
                  court order, or legal process, such as in response to a court
                  order or a subpoena (including in response to public
                  authorities to meet national security or law enforcement
                  requirements).
                </li>
                <li>
                  Vital Interests and Legal Rights. We may disclose your
                  information where we believe it is necessary to investigate,
                  prevent, or take action regarding potential violations of our
                  policies, suspected fraud, situations involving potential
                  threats to the safety of any person and illegal activities, or
                  as evidence in litigation in which we are involved.
                </li>
                <li>
                  Vendors, Consultants and Other Third-Party Service Providers.
                  We may share your data with third party vendors, service
                  providers, contractors or agents who perform services for us
                  or on our behalf and require access to such information to do
                  that work.{" "}
                </li>
                <li>
                  Business Transfers. We may share or transfer your information
                  in connection with, or during negotiations of, any merger,
                  sale of company assets, financing, or acquisition of all or a
                  portion of our business to another company.
                </li>
                <li>
                  Third-Party Advertisers. We may use third-party advertising
                  companies to serve ads when you visit the Site. These
                  companies may use information about your visits to our Site
                  and other websites that are contained in web cookies and other
                  tracking technologies in order to provide advertisements about
                  goods and services of interest to you.
                </li>
                <li>
                  Affiliates. We may share your information with our affiliates,
                  in which case we will require those affiliates to honor this
                  privacy policy. Affiliates include our parent company and any
                  subsidiaries, joint venture partners or other companies that
                  we control or that are under common control with us.
                </li>
                <li>
                  Business Partners. We may share your information with our
                  business partners to offer you certain products, services or
                  promotions.
                </li>
                <li>
                  With your Consent. We may disclose your personal information
                  for any other purpose with your consent.
                </li>
                <li>
                  Other Users. When you share personal information (for example,
                  by posting comments, contributions or other content to the
                  Site) or otherwise interact with public areas of the Site,
                  such personal information may be viewed by all users and may
                  be publicly distributed outside the Site in perpetuity.
                </li>
              </ul>
            </p>

            <h3>4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</h3>
            <p>
              We may use cookies and similar tracking technologies (like web
              beacons and pixels) to access or store information. Specific
              information about how we use such technologies and how you can
              refuse certain cookies is set out in our Cookie Policy.
            </p>
            <h3>5. IS YOUR INFORMATION TRANSFERRED INTERNATIONALLY?</h3>
            <p>
              Our website server is located in the United Kingdom. We will not
              transfer your personal information to an overseas recipient.
            </p>
            <h3>6. WHAT IS OUR STANCE ON THIRD-PARTY WEBSITES?</h3>
            <p>
              The Site may contain advertisements from third parties that are
              not affiliated with us and which may link to other websites,
              online services or mobile applications. We cannot guarantee the
              safety and privacy of data you provide to any third parties. Any
              data collected by third parties is not covered by this privacy
              policy. We are not responsible for the content or privacy and
              security practices and policies of any third parties, including
              other websites, services or applications that may be linked to or
              from the Site. You should review the policies of such third
              parties and contact them directly to respond to your questions.
            </p>
            <h3>7. HOW LONG DO WE KEEP YOUR INFORMATION?</h3>
            <p>
              We will only keep your personal information for as long as it is
              necessary for the purposes set out in this privacy policy, unless
              a longer retention period is required or permitted by law (such as
              tax, accounting or other legal requirements).{" "}
            </p>
            <p>
              When we have no ongoing legitimate business need to process your
              personal information, we will either delete or anonymize it, or,
              if this is not possible (for example, because your personal
              information has been stored in backup archives), then we will
              securely store your personal information and isolate it from any
              further processing until deletion is possible.
            </p>
            <h3>8. HOW DO WE KEEP YOUR INFORMATION SAFE?</h3>
            <p>
              We have implemented appropriate technical and organizational
              security measures designed to protect the security of any personal
              information we process. However, please also remember that we
              cannot guarantee that the internet itself is 100% secure. Although
              we will do our best to protect your personal information,
              transmission of personal information to and from our Site is at
              your own risk. You should only access the services within a secure
              environment.
            </p>
            <h3>9. DO WE COLLECT INFORMATION FROM MINORS?</h3>
            <p>
              We do not knowingly solicit data from or market to children under
              16 years of age. By using the Site, you represent that you are at
              least 16 or that you are the parent or guardian of such a minor
              and consent to such minor dependent’s use of the Site. If we learn
              that personal information from users less than 16 years of age has
              been collected, we will deactivate the account and take reasonable
              measures to promptly delete such data from our records. If you
              become aware of any data we have collected from children under age
              16, please contact us at{" "}
              <a href="https://www.foodengo.co.uk">info@foodengo.co.uk.</a>
            </p>
            <h3>10. GDPR ENTITLEMENT</h3>
            <p>
              EU General Data Protection Regulation (GDPR) has provided the
              below rights to the EU residents:
            </p>
            <p>
              <ul>
                <li>
                  Right to information - the purposes for processing Personal
                  Information and the rights of the individual.
                </li>
                <li>
                  Right to access the Personal Information that are processed.
                </li>
                <li>Right to erasure ("Right to be forgotten").</li>
                <li>Right to rectification.</li>
                <li>Right to restriction of processing.</li>
                <li>Right to object (opt-out) to processing.</li>
               
              </ul>
            </p>

            <p>
              EU residents can exercise these rights by raising a request
              directly at info@foodengo.co.uk.
            </p>
            <h3>11. WHAT ARE YOUR PRIVACY RIGHTS?</h3>
            <h3>Personal Information</h3>
            <p>
              You may at any time review or change the information in your
              account or terminate your account by:
            </p>
            <br />
            <p>
              <b className="b"> Contacting us using the contact information provided</b>
            </p>
            <p>
              Upon your request to terminate your account, we will deactivate or
              delete your account and information from our active databases.
              However, some information may be retained in our files to prevent
              fraud, troubleshoot problems, assist with any investigations,
              enforce our Terms of Use and/or comply with legal requirements.
            </p>
            <p>
              <b className="b">Cookies and similar technologies:</b> Most Web
              browsers are set to accept cookies by default. If you prefer, you
              can usually choose to set your browser to remove cookies and to
              reject cookies. If you choose to remove cookies or reject cookies,
              this could affect certain features or services of our Site.{" "}
            </p>
            <h3>12. DO WE MAKE UPDATES TO THIS POLICY?</h3>
            <p>
              We may update this privacy policy from time to time. The updated
              version will be indicated by an updated “Revised” date and the
              updated version will be effective as soon as it is accessible. If
              we make material changes to this privacy policy, we may notify you
              either by prominently posting a notice of such changes or by
              directly sending you a notification. We encourage you to review
              this privacy policy frequently to be informed of how we are
              protecting your information.
            </p>
            <h3>13. DATA PROTECTION OFFICER</h3>
            <p>
              We have appointed a Data Protection Officer ("DPO") who is
              responsible for overseeing questions in relation to this privacy
              notice. If you have any questions about this privacy notice,
              including any requests to exercise your legal rights, please
              contacts Data Protection Officer, at our e-mail
              <a href="https://www.foodengo.co.uk"> info@foodengo.co.uk.</a>
            </p>
            <h3>14. HOW CAN YOU CONTACT US ABOUT THIS POLICY?</h3>
            <p>
              If you have questions or comments about this policy, email us at
              info@foodengo.co.uk.
            </p>
          </Segment>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Privacy;
