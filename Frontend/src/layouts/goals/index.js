import React, { useState, useEffect } from "react";
import axios from "axios";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import Cookies from "js-cookie";
import PropTypes from "prop-types";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";

const GoalCard = ({ goal }) => {
  return (
    <Card mb={2} style={{ margin: "20px 0" }}>
      <CardContent>
        <Typography variant="h6" style={{ fontWeight: "bold" }}>
          {goal.title}
        </Typography>
        <Typography>
          Amount: ₹{parseFloat(goal.amount).toFixed(2)} | Target Date: {goal.targetDate}
        </Typography>
        <Typography>{goal.description}</Typography>
      </CardContent>
    </Card>
  );
};
GoalCard.propTypes = {
  goal: PropTypes.shape({
    title: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    targetDate: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

function Goals() {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState({
    title: "",
    amount: "",
    targetDate: "",
    description: "",
  });

  const userIdFromCookie = Cookies.get("id");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGoal((prevGoal) => ({ ...prevGoal, [name]: value }));
  };

  const addGoal = () => {
    if (newGoal.title && newGoal.amount && newGoal.targetDate && newGoal.description) {
      const goalData = {
        user_id: userIdFromCookie,
        ...newGoal,
      };

      axios
        .post("http://localhost:8000/addGoal", goalData)
        .then((response) => {
          console.log("Goal added successfully:", response.data);
          setGoals((prevGoals) => [...prevGoals, newGoal]);
          setNewGoal({ title: "", amount: "", targetDate: "", description: "" });
        })
        .catch((error) => {
          console.error("Error adding goal:", error);
        });
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/goals/${userIdFromCookie}`)
      .then((response) => {
        setGoals(response.data);
      })
      .catch((error) => {
        console.error("Error fetching goals:", error);
      });
  }, [userIdFromCookie]);

  return (
    <div>
      <DashboardLayout>
        <DashboardNavbar />
        <SoftBox my={3}>
          <SoftTypography variant="h4" fontWeight="bold">
            Budget Goals
          </SoftTypography>

          <Grid container spacing={3}>
            {goals.map((goal, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <GoalCard goal={goal} />
              </Grid>
            ))}
          </Grid>
          <SoftBox mt={4}>
            <SoftTypography variant="h5" fontWeight="bold">
              Add a New Goal
            </SoftTypography>
            <form>
              <SoftInput
                type="text"
                name="title"
                placeholder="Goal Title"
                value={newGoal.title}
                onChange={handleInputChange}
                mb={2}
              />
              <br />
              <SoftInput
                type="number"
                name="amount"
                placeholder="Budget Amount"
                value={newGoal.amount}
                onChange={handleInputChange}
                mb={2}
              />
              <br />
              <SoftInput
                type="date"
                name="targetDate"
                placeholder="Target Date"
                value={newGoal.targetDate}
                onChange={handleInputChange}
                mb={2}
              />
              <br />
              <SoftInput
                type="text"
                name="description"
                placeholder="Goal Description"
                value={newGoal.description}
                onChange={handleInputChange}
                mb={2}
              />
              <br />
              <SoftButton variant="gradient" color="dark" onClick={addGoal}>
                Add Goal
              </SoftButton>
            </form>
          </SoftBox>
        </SoftBox>
        <Footer />
      </DashboardLayout>
    </div>
  );
}

export default Goals;
