// // @mui material components
// import Grid from "@mui/material/Grid";
// import Icon from "@mui/material/Icon";
// import styled from "styled-components";

// import Card from "@mui/material/Card";
// import Checkbox from "@mui/material/Checkbox";
// import React, { useState } from "react";
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import Dashboard from "layouts/dashboard";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";
// import SoftBox from "components/SoftBox";
// import SoftTypography from "components/SoftTypography";
// import SoftInput from "components/SoftInput";
// import SoftButton from "components/SoftButton";

// // function Feedback() {
// //   return (
// //     <div>
// //       <DashboardLayout>
// //         <DashboardNavbar />
// //         <SoftBox my={3}>
// //           <Grid container justifyContent="center" alignItems="center" style={{ minHeight: "60vh" }}>
// //             {/* <form>
// //               <label>
// //                 Name:
// //                 <input type="text" name="name" value={formData.name} required />
// //               </label>
// //               <br />
// //               <label>
// //                 Email:
// //                 <input type="email" name="email" value={formData.email} required />
// //               </label>
// //               <br />
// //               <label>
// //                 Feedback Category:
// //                 <select name="category" value={formData.category} required>
// //                   <option value="">Select a category</option>
// //                   <option value="bug">Bug Report</option>
// //                   <option value="feature">Feature Request</option>
// //                   <option value="general">General Feedback</option>
// //                 </select>
// //               </label>
// //               <br />
// //               <label>
// //                 Comments:
// //                 <textarea name="comments" value={formData.comments} required />
// //               </label>
// //               <br />
// //               <button type="submit">Submit Feedback</button>
// //             </form> */}
// //             <SoftBox my={3}>
// //               <SoftBox component="form" role="form">
// //                 <SoftBox mb={3}>
// //                   <SoftInput placeholder="Name" />
// //                 </SoftBox>
// //                 <SoftBox mb={2}>
// //                   <SoftInput type="email" placeholder="Email" />
// //                 </SoftBox>
// //                 <SoftBox mb={2}>
// //                   <SoftInput type="text" placeholder="Phone No." />
// //                 </SoftBox>
// //                 <SoftBox mb={2}>
// //                   {/* <SoftInput type="area" placeholder="Password" /> */}
// //                   <SoftBox mb={2}>
// //                     <textarea
// //                       style={{
// //                         width: "100%",
// //                         padding: "10px",
// //                         fontSize: "16px",
// //                         borderRadius: "4px",
// //                         border: "1px solid #ccc",
// //                         boxSizing: "border-box",
// //                         transition: "0.3s",
// //                         backgroundColor: "rgba(255, 255, 255, 0.5)", // 50% opacity
// //                         ":focus": {
// //                           borderColor: "#3f51b5",
// //                           boxShadow: "0 0 0 0.2rem rgba(63,81,181,.25)",
// //                         },
// //                       }}
// //                       placeholder="Your Text Here"
// //                     ></textarea>
// //                   </SoftBox>
// //                 </SoftBox>
// //                 {/* <SoftBox display="flex" alignItems="center">
// //                   <Checkbox checked={agreement} onChange={handleSetAgremment} />
// //                   <SoftTypography
// //                     variant="button"
// //                     fontWeight="regular"
// //                     sx={{ cursor: "poiner", userSelect: "none" }}
// //                   >
// //                     &nbsp;&nbsp;I agree the&nbsp;
// //                   </SoftTypography>
// //                   <SoftTypography
// //                     component="a"
// //                     href="#"
// //                     variant="button"
// //                     fontWeight="bold"
// //                     textGradient
// //                   >
// //                     Terms and Conditions
// //                   </SoftTypography>
// //                 </SoftBox> */}
// //                 <SoftBox mt={4} mb={1}>
// //                   <SoftButton variant="gradient" color="dark" fullWidth>
// //                     Send
// //                   </SoftButton>
// //                 </SoftBox>
// //                 {/* <SoftBox mt={3} textAlign="center">
// //                   <SoftTypography variant="button" color="text" fontWeight="regular">
// //                     Already have an account?&nbsp;
// //                     <SoftTypography
// //                       // component={Link}
// //                       to="/authentication/sign-in"
// //                       variant="button"
// //                       color="dark"
// //                       fontWeight="bold"
// //                       textGradient
// //                     >
// //                       Sign in
// //                     </SoftTypography>
// //                   </SoftTypography>
// //                 </SoftBox> */}
// //               </SoftBox>
// //             </SoftBox>
// //           </Grid>
// //         </SoftBox>
// //         <br /> <br />
// //         <Footer />
// //       </DashboardLayout>
// //     </div>
// //   );
// // }
// // export default Feedback;
// function Feedback() {
//   const StyledTextarea = styled.textarea`
//     width: 100%;
//     padding: 20px;
//     fontsize: 24px;
//     borderradius: 4px;
//     border: 1px solid rgb(204, 204, 204);
//     boxsizing: border-box;
//     transition: all 0.3s ease 0s;
//     backgroundcolor: rgba(255, 255, 255, 0.5);

//     ::placeholder {
//       color: rgba(0, 0, 0, 0.5); // 50% opacity
//     }
//   `;
//   return (
//     <div>
//       <DashboardLayout>
//         <DashboardNavbar />
//         <SoftBox my={3}>
//           <Grid container justifyContent="center" alignItems="center" style={{ minHeight: "60vh" }}>
//             <SoftBox my={3}>
//               <SoftBox component="form" role="form">
//                 <SoftBox mb={3}>
//                   <SoftInput
//                     placeholder="Name"
//                     style={{ width: "100%", fontSize: "18px", padding: "12px" }}
//                   />
//                 </SoftBox>
//                 <SoftBox mb={2}>
//                   <SoftInput
//                     type="email"
//                     placeholder="Email"
//                     style={{ width: "100%", fontSize: "18px", padding: "12px" }}
//                   />
//                 </SoftBox>
//                 <SoftBox mb={2}>
//                   <SoftInput
//                     type="text"
//                     placeholder="Phone No."
//                     style={{ width: "100%", fontSize: "18px", padding: "12px" }}
//                   />
//                 </SoftBox>
//                 <SoftBox mb={2}>
//                   <SoftBox mb={2}>
//                     {/* <textarea
//                       style={{
//                         width: "100%",
//                         padding: "10px",
//                         fontSize: "18px",
//                         borderRadius: "4px",
//                         border: "1px solid #ccc",
//                         boxSizing: "border-box",
//                         transition: "0.3s",
//                         backgroundColor: "rgba(255, 255, 255, 0.5)", // 50% opacity
//                         ":focus": {
//                           borderColor: "#3f51b5",
//                           boxShadow: "0 0 0 0.2rem rgba(63,81,181,.25)",
//                         },
//                       }}
//                       placeholder="Your Text Here"
//                     ></textarea> */}
//                     <div className="MuiBox-root css-n2lc3p">
//                       <div className="MuiBox-root css-n2lc3p">
//                         <textarea
//                           placeholder="Your Feedback Message!"
//                           style={{
//                             width: "100%",
//                             padding: "20px", // Increase this value as needed
//                             fontSize: "24px", // Increase this value as needed
//                             borderRadius: "4px",
//                             border: "1px solid rgb(204, 204, 204)",
//                             boxSizing: "border-box",
//                             transition: "all 0.3s ease 0s",
//                             backgroundColor: "rgba(255, 255, 255, 0.5)",
//                           }}
//                           data-gramm="false"
//                         ></textarea>
//                       </div>
//                     </div>
//                   </SoftBox>
//                 </SoftBox>
//                 <SoftBox mt={4} mb={1}>
//                   <SoftButton variant="gradient" color="dark" fullWidth>
//                     Send
//                   </SoftButton>
//                 </SoftBox>
//               </SoftBox>
//             </SoftBox>
//           </Grid>
//         </SoftBox>
//         <br /> <br />
//         <Footer />
//       </DashboardLayout>
//     </div>
//   );
// }

// export default Feedback;
// Feedback.jsimport React, { useState } from "react";


import React, { useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import { Grid, Card, CardContent, TextareaAutosize } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);

  const [newFeedback, setNewFeedback] = useState({
    name: "",
    email: "",
    comments: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFeedback((prevFeedback) => ({ ...prevFeedback, [name]: value }));
  };

  const submitFeedback = () => {
    if (newFeedback.name && newFeedback.email && newFeedback.comments) {
      fetch('http://localhost:8000/addFeedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newFeedback),
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        console.log('Feedback submitted successfully:', data);
        // Optionally, you can update the state or take other actions
      })
      .catch(error => {
        console.error('Error submitting feedback:', error);
      });
    }
  };

  return (
    <div>
      <DashboardLayout>
        <DashboardNavbar />
        <SoftBox my={3} textAlign="center">
          <SoftTypography variant="h4" fontWeight="bold" mb={3}>
            Feedback
          </SoftTypography>
          <Grid container spacing={2} justifyContent="center">
            {feedbacks.map((feedback) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={feedback.id}>
                <Card>
                  <CardContent>
                    <SoftTypography variant="h6" fontWeight="bold" mb={1}>
                      {feedback.name}
                    </SoftTypography>
                    <SoftTypography>
                      <strong>Email:</strong> {feedback.email}
                    </SoftTypography>
                    <SoftTypography>
                      <strong>Comments:</strong> {feedback.comments}
                    </SoftTypography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <SoftBox mt={4} width="60%" mx="auto">
            <SoftTypography variant="h5" fontWeight="bold" mb={2}>
              Provide Your Feedback
            </SoftTypography>
            <form>
              <SoftInput
                type="text"
                name="name"
                placeholder="Your Name"
                value={newFeedback.name}
                onChange={handleInputChange}
                mb={2}
                fullWidth
              />
              <br />
              <SoftInput
                type="email"
                name="email"
                placeholder="Your Email"
                value={newFeedback.email}
                onChange={handleInputChange}
                mb={2}
                fullWidth
              />
              <br />
              <TextareaAutosize
                minRows={3}
                maxRows={6}
                placeholder="Your Feedback Here"
                name="comments"
                value={newFeedback.comments}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  fontSize: "14px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                  boxSizing: "border-box",
                  transition: "0.3s",
                  backgroundColor: "rgba(255, 255, 255, 0.5)",
                  resize: "vertical",
                  marginBottom: "16px",
                }}
              />
              <br />
              <SoftButton
                variant="gradient"
                color="dark"
                onClick={submitFeedback}
                startIcon={<SendIcon />}
                fullWidth
              >
                Submit Feedback
              </SoftButton>
            </form>
          </SoftBox>
        </SoftBox>
        <Footer />
      </DashboardLayout>
    </div>
  );
}

export default Feedback;
