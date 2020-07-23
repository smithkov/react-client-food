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

class Disclaimer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <NavBar />
        <div style={{ padding: 50 }}>
          <Segment style={{ marginTop: 100 }} placeholder>
            <h3 style={{ textAlign: "center" }}>Foodengo - DISCLAIMER</h3>
            <h3>Last Updated 19 July 2020</h3>
            <hr></hr>
            <h3>DISCLAIMER</h3>

            <p>
              This Disclaimer forms part of and must be read in conjunction
              with, website Terms and Conditions. We reserve the right to change
              this Disclaimer at any time. The information contained in this
              website is for general information purposes only. The information
              is provided by{" "}
              <a href="https://www.foodengo.co.uk"> www.foodengo.co.uk</a>{" "}
              ("SOFTNERGY LIMITED" or "we").
            </p>
            <p>
              At <a href="https://www.foodengo.co.uk"> www.foodengo.co.uk</a>,
              we provide you meticulously designed food delivery ecommerce
              platform where a buyer can buy food products, and Seller
              (registered) can sell their food products online. With all of our
              products, we focus on quality by having our products subject to
              rigorous quality checks before it reaches you.
            </p>
            <p>
              We take no responsibility for any indirect damage that may result
              from the product. We accept no responsibility for delays/errors
              due to circumstances outside the Company's ruling (Force Majeure).
              These circumstances can be, for example, labor conflict, fire,
              war, government decisions, reduced or non-delivery from the
              supplier.
            </p>

            <p>
              We shall not be liable and responsible for the behavior of the
              users (both Sellers and the customers). And we are also not
              accountable for the quality of the products provided by the
              Sellers on the website.
            </p>
            <p>
              You understand and agree that we (a) do not guarantee the
              accuracy, completeness, validity, or timeliness of information
              listed by us or any third parties; and (b) shall not be
              responsible for any materials posted by us or any third party. You
              shall use your own judgment, caution, and common sense in
              evaluating any prospective methods or offers and any information
              provided by us or any third party.
            </p>
            <p>
              Further, we shall not be liable for direct, indirect
              consequential, or any other form of loss or damage that may be
              suffered by a user through the use of the www.foodengo.co.uk
              Website including loss of data or information or any kind of
              financial or physical loss or damage. We are not responsible to
              you for:
            </p>
            <p>
              <ul>
                <li>
                  any reliance that you may place on any material or commentary
                  posted on our website. Please note that nothing contained in
                  our website or the material published on it is intended to
                  amount to advice on which you should rely; or
                </li>
                <li>
                  any losses you suffer because the information you put into our
                  website is inaccurate or incomplete; or
                </li>
                <li>
                  any losses you suffer because you cannot use our website at
                  any time; or
                </li>
                <li>any errors in or omissions from our website; or</li>
                <li>
                  any losses you may suffer by relying on any commentary,
                  postings or reviews (of our services or that of our partners)
                  on our website; or
                </li>
                <li>
                  any unauthorized access or loss of personal information that
                  is beyond our control.
                </li>
              </ul>
            </p>
            <p>
              <h3>General: </h3>
              The website, its content, and service are provided on an "as is"
              and "as available" basis without any warranties of any kind,
              including that the website will operate error-free or that the
              website, its servers, its content or its service are free of
              computer viruses or similar contamination or destructive features.
              Although we seek to maintain safe, secure, accurate, and
              well-functioning services, we cannot guarantee the continuous
              operation of or access to our services, and there may at times be
              inadvertent technical or factual errors or inaccuracies.
            </p>
            <p>
              <h4>A) No warranties. </h4>
              We specifically (but without limitation) disclaim
              <ul type="a">
                <li>
                  Any implied warranties of merchantability, fitness for a
                  particular purpose, quiet enjoyment, or non-infringement; and{" "}
                </li>
                <li>
                  Any warranties arising out of course-of-dealing, usage, or
                  trade. You assume all risk for any/all damages that may result
                  from your use of or access to the services. We shall not be
                  responsible for the loss of, damage to, or unavailability of
                  any information you have made available through the services,
                  and you are solely responsible for ensuring that you have
                  backup copies of any information you have made available
                  through the services.
                </li>
              </ul>
            </p>
            <p>
              {" "}
              <h4>B) No guarantee of accuracy. </h4>
              We do not guarantee the accuracy of and disclaims all liability
              for, any errors or other inaccuracies in the information, content,
              recommendations, and materials made available through the
              services.
            </p>
            <p>
              <h4> C) No warranties regarding third parties.</h4> We make no
              representations, warranties, or guarantees, express or implied,
              regarding any third party service or advice provided by a third
              party.
            </p>
            <p>
              Every effort is made to keep the website up and running smoothly.
              However, we take no responsibility for, and will not be liable
              for, the website being temporarily unavailable due to technical
              issues beyond our control.
            </p>
            <p>
              If you require any more information or have any questions about
              our site's disclaimer, please feel free to contact us by email at
              <a href="https://www.foodengo.co.uk"> info@foodengo.co.uk</a>.
            </p>
            
          </Segment>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Disclaimer;
