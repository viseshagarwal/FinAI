import { useState } from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

function ProfileInfoCard({ title, description, info, social, action, onUpdate }) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editedInfo, setEditedInfo] = useState({});

  const handleEditOpen = () => {
    setIsEditOpen(true);
    // Initialize editedInfo with current profile info
    setEditedInfo({ ...info });
  };

  const handleEditClose = () => {
    setIsEditOpen(false);
    // Reset editedInfo
    setEditedInfo({});
  };

  const handleSave = () => {
    // Call the onUpdate function to update the profile info in the database
    onUpdate(editedInfo);
    handleEditClose();
  };

  const labels = [];
  const values = [];
  const { socialMediaColors } = colors;
  const { size } = typography;

  // Convert this form `objectKey` of the object key in to this `object key`
  Object.keys(info).forEach((el) => {
    // Skip the location field
    if (el !== "location") {
      if (el.match(/[A-Z\s]+/)) {
        const uppercaseLetter = Array.from(el).find((i) => i.match(/[A-Z]+/));
        const newElement = el.replace(uppercaseLetter, ` ${uppercaseLetter.toLowerCase()}`);

        labels.push(newElement);
      } else {
        labels.push(el);
      }
      values.push(info[el]);
    }
  });

  // Render the card info items
  const renderItems = labels.map((label, key) => (
    <SoftBox key={label} display="flex" py={1} pr={2}>
      <SoftTypography variant="button" fontWeight="bold" textTransform="capitalize">
        {label}: &nbsp;
      </SoftTypography>
      <SoftTypography variant="button" fontWeight="regular" color="text">
        &nbsp;{values[key]}
      </SoftTypography>
    </SoftBox>
  ));

  // Render the card social media icons
  const renderSocial = social.map(({ link, icon, color }) => (
    <SoftBox
      key={color}
      component="a"
      href={link}
      target="_blank"
      rel="noreferrer"
      fontSize={size.lg}
      color={socialMediaColors[color].main}
      pr={1}
      pl={0.5}
      lineHeight={1}
    >
      {icon}
    </SoftBox>
  ));

  return (
    <Card sx={{ height: "100%" }}>
      <SoftBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </SoftTypography>
        <SoftTypography component="span">
          <Tooltip title={action.tooltip} placement="top">
            <Icon onClick={handleEditOpen}>edit</Icon>
          </Tooltip>
        </SoftTypography>
      </SoftBox>
      <SoftBox p={2}>
        <SoftBox mb={2} lineHeight={1}>
          <SoftTypography variant="button" color="text" fontWeight="regular">
            {description}
          </SoftTypography>
        </SoftBox>
        <SoftBox opacity={0.3}>
          <Divider />
        </SoftBox>
        <SoftBox>
          {renderItems}
          <SoftBox display="flex" py={1} pr={2}>
            <SoftTypography variant="button" fontWeight="bold" textTransform="capitalize">
              social: &nbsp;
            </SoftTypography>
            {renderSocial}
          </SoftBox>
        </SoftBox>
      </SoftBox>
      <Modal open={isEditOpen} onClose={handleEditClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <SoftTypography variant="h6" component="h2" textAlign="center" gutterBottom>
            Edit Profile
          </SoftTypography>
          {Object.keys(editedInfo).map((key) => (
            <TextField
              key={key}
              fullWidth
              label={key.charAt(0).toUpperCase() + key.slice(1)}
              name={key}
              value={editedInfo[key]}
              onChange={(e) => setEditedInfo({ ...editedInfo, [key]: e.target.value })}
              margin="normal"
            />
          ))}
          <SoftBox display="flex" justifyContent="center">
            <Button variant="contained" onClick={handleSave} sx={{ mr: 2 }}>
              Save
            </Button>
            <Button variant="outlined" onClick={handleEditClose}>
              Cancel
            </Button>
          </SoftBox>
        </Box>
      </Modal>
    </Card>
  );
}

ProfileInfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  info: PropTypes.object.isRequired,
  social: PropTypes.array.isRequired,
  action: PropTypes.shape({
    tooltip: PropTypes.string.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired, // Function to update profile info in the database
};

export default ProfileInfoCard;
