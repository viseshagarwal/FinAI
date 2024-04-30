/* eslint-disable react/prop-types */
// @mui material components
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftProgress from "components/SoftProgress";

// Images
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";
import logoJira from "assets/images/small-logos/logo-jira.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoWebDev from "assets/images/small-logos/logo-webdev.svg";
import logoXD from "assets/images/small-logos/logo-xd.svg";

function Completion({ value, color }) {
  return (
    <SoftBox display="flex" alignItems="center">
      <SoftTypography variant="caption" color="text" fontWeight="medium">
        {value}%&nbsp;
      </SoftTypography>
      <SoftBox width="8rem">
        <SoftProgress value={value} color={color} variant="gradient" label={false} />
      </SoftBox>
    </SoftBox>
  );
}

const Action = (
  <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small">
    more_vert
  </Icon>
);

const projectsTableData = {
  columns: [
    { name: "Name", align: "left" },
    { name: "Budget", align: "left" },
    { name: "Balance_Left", align: "center" },
    { name: "Used_Amount", align: "left" },
    { name: "Action", align: "center" },
  ],

  rows: [
    {
      Name: [logoSpotify, "New Budget"],
      Budget: (
        <SoftTypography variant="button" color="text" fontWeight="medium">
          ₹50,000
        </SoftTypography>
      ),
      Used_Amount: (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          ₹34,845
        </SoftTypography>
      ),
      Balance_Left: <Completion value={60} color="info" />,
      Action,
    },
    {
      Name: [logoInvesion, "Invesion"],
      Budget: (
        <SoftTypography variant="button" color="text" fontWeight="medium">
          ₹20,000
        </SoftTypography>
      ),
      Used_Amount: (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          ₹34,845
        </SoftTypography>
      ),
      Balance_Left: <Completion value={100} color="success" />,
      Action,
    },
    {
      Name: [logoJira, "Jira"],
      Budget: (
        <SoftTypography variant="button" color="text" fontWeight="medium">
          ₹25,000
        </SoftTypography>
      ),
      Used_Amount: (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          ₹34,845
        </SoftTypography>
      ),
      Balance_Left: <Completion value={30} color="error" />,
      Action,
    },
    {
      Name: [logoSlack, "Slack"],
      Budget: (
        <SoftTypography variant="button" color="text" fontWeight="medium">
          ₹10,000
        </SoftTypography>
      ),
      Used_Amount: (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          ₹34,845
        </SoftTypography>
      ),
      Balance_Left: <Completion value={0} color="error" />,
      Action,
    },
    {
      Name: [logoWebDev, "Webdev"],
      Budget: (
        <SoftTypography variant="button" color="text" fontWeight="medium">
          ₹45,000
        </SoftTypography>
      ),
      Used_Amount: (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          ₹34,845
        </SoftTypography>
      ),
      Balance_Left: <Completion value={80} color="info" />,
      Action,
    },
    {
      Name: [logoXD, "Adobe XD"],
      Budget: (
        <SoftTypography variant="button" color="text" fontWeight="medium">
          ₹35,000
        </SoftTypography>
      ),
      Used_Amount: (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          ₹34,845
        </SoftTypography>
      ),
      Balance_Left: <Completion value={100} color="success" />,
      Action,
    },
  ],
};

export default projectsTableData;
