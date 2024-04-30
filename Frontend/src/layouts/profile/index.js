import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import SoftBox from "components/SoftBox";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import burceMars from "assets/images/bruce-mars.jpg";
import curved0 from "assets/images/curved-images/curved0.jpg";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Cookies from "js-cookie";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import breakpoints from "assets/theme/base/breakpoints";

function Overview() {
  const [profileInfo, setProfileInfo] = useState(null);
  const [name, setName] = useState("");

  const handleUpdateProfile = async (updatedInfo) => {
    try {
      const id = Cookies.get("id");
      //console.log("User ID:", id); // Log the user ID

      const dataToUpdate = { id, ...updatedInfo };
      //console.log("Data to update:", dataToUpdate);

      const sql =
        "UPDATE users SET name = :name, phone_no = :phone_no, email = :email WHERE id = :id";

      const response = await fetch("http://localhost:8000/profile/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ params: dataToUpdate }),
      });

      //console.log("Response:", response); // Log the response

      if (!response.ok) {
        throw new Error("Failed to update profile information");
      }

      const responseData = await response.json();
      //console.log("Response data:", responseData); // Log the response data

      setProfileInfo(dataToUpdate);
      setName(dataToUpdate.name);
      console.log("Profile information updated successfully");
    } catch (error) {
      console.error("Error updating profile information:", error.message);
    }
  };
  useEffect(() => {
    const id = Cookies.get("id");
    fetch(`http://localhost:8000/profile?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProfileInfo(data);
        setName(data.name);
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      });
  }, []);

  return (
    <DashboardLayout>
      {/* <Header profileInfo={profileInfo} /> */}
      <SoftBox position="relative">
        <DashboardNavbar absolute light />
        <SoftBox
          display="flex"
          alignItems="center"
          position="relative"
          minHeight="18.75rem"
          borderRadius="xl"
          sx={{
            backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
              `${linearGradient(
                rgba(gradients.info.main, 0.6),
                rgba(gradients.info.state, 0.6)
              )}, url(${curved0})`,
            backgroundSize: "cover",
            backgroundPosition: "50%",
            overflow: "hidden",
          }}
        />
        <Card
          sx={{
            backdropFilter: `saturate(200%) blur(30px)`,
            backgroundColor: ({ functions: { rgba }, palette: { white } }) => rgba(white.main, 0.8),
            boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
            position: "relative",
            mt: -8,
            mx: 3,
            py: 2,
            px: 2,
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item>
              <SoftAvatar
                src={burceMars}
                alt="profile-image"
                variant="rounded"
                size="xl"
                shadow="sm"
              />
            </Grid>
            <Grid item>
              <SoftBox height="100%" mt={0.5} lineHeight={1}>
                <SoftTypography variant="h5" fontWeight="medium">
                  {name}
                </SoftTypography>
              </SoftBox>
            </Grid>
          </Grid>
        </Card>
      </SoftBox>
      <SoftBox mt={5} mb={3}>
        <Grid>
          <Grid item xs={12} md={6} xl={4}>
            <ProfileInfoCard
              title="profile information"
              description="This is a description"
              info={{
                name: profileInfo ? profileInfo.name : "",
                phone_no: profileInfo ? profileInfo.phone_no : "",
                email: profileInfo ? profileInfo.email : "",
              }}
              social={[
                {
                  link: profileInfo ? profileInfo.facebookLink : "",
                  icon: <FacebookIcon />,
                  color: "facebook",
                },
                {
                  link: profileInfo ? profileInfo.twitterLink : "",
                  icon: <TwitterIcon />,
                  color: "twitter",
                },
                {
                  link: profileInfo ? profileInfo.instagramLink : "",
                  icon: <InstagramIcon />,
                  color: "instagram",
                },
              ]}
              action={{ tooltip: "Edit profile" }}
              onUpdate={handleUpdateProfile}
            />
          </Grid>
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
