import React, { useState, useEffect } from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import Cookies from "js-cookie";

function Debts() {
  const [debts, setDebts] = useState([]);
  const [newDebt, setNewDebt] = useState({
    creditor: "",
    amount: "",
    interestRate: "",
    dueDate: "",
  });
  const [totalDebtAmount, setTotalDebtAmount] = useState(0);

  const userIdFromCookie = Cookies.get("id");

  useEffect(() => {
    fetchDebts();
    fetchTotalDebtAmount();
  }, []);

  const fetchDebts = () => {
    const requestData = {
      user_id: userIdFromCookie,
    };

    fetch("http://localhost:8000/getDebts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setDebts(data.debts);
        setTotalDebtAmount(data.totalDebtAmount);
      })
      .catch((error) => {
        console.error("Error fetching debts:", error);
      });
  };

  const fetchTotalDebtAmount = () => {
    fetch("http://localhost:8000/totalDebtAmount", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setTotalDebtAmount(data.totalDebtAmount);
      })
      .catch((error) => {
        console.error("Error fetching total debt amount:", error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDebt((prevDebt) => ({ ...prevDebt, [name]: value }));
  };

  const addDebt = () => {
    if (newDebt.creditor && newDebt.amount && newDebt.interestRate && newDebt.dueDate) {
      const debtData = {
        user_id: userIdFromCookie,
        ...newDebt,
      };

      fetch("http://localhost:8000/addDebt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(debtData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Debt added successfully:", data);
          // If the debt is successfully added, update the local state
          setDebts((prevDebts) => [...prevDebts, newDebt]);
          setNewDebt({ creditor: "", amount: "", interestRate: "", dueDate: "" });
        })
        .catch((error) => {
          console.error("Error adding debt:", error);
        });
    }
  };

  // const creditorChartOptions = {
  //   labels: debts.map((debt, index) => `Creditor ${index + 1}`),
  //   datasets: [
  //     {
  //       data: debts.map((debt) => debt.amount),
  //       backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#FF9800"],
  //       hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#FF9800"],
  //     },
  //   ],
  // };
  const creditorChartOptions = {
    labels: debts.map((debt) => debt.creditor),
    datasets: [
      {
        data: debts.map((debt) => debt.amount),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#FF9800"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#FF9800"],
      },
    ],
  };
  // const totalDebtChartOptions = {
  //   labels: ["Total Debt"],
  //   datasets: [
  //     {
  //       data: [totalDebtAmount],
  //       backgroundColor: ["#FF6384"],
  //       hoverBackgroundColor: ["#FF6384"],
  //     },
  //   ],
  // };

  return (
    <div>
      <DashboardLayout>
        <DashboardNavbar />
        <SoftBox my={3}>
          <SoftTypography variant="h4" fontWeight="bold" mb={3}>
            Debts Management
          </SoftTypography>
          <SoftBox display="flex" justifyContent="space-between">
            <div>
              <SoftTypography variant="h5" fontWeight="bold" mb={2}>
                Debts Overview
              </SoftTypography>
              <Doughnut data={creditorChartOptions} />
            </div>
            <br />
            {/* <div>
              <SoftTypography variant="h5" fontWeight="bold" mb={2}>
                Total Debt Amount
              </SoftTypography>
              <Bar data={totalDebtChartOptions} />
            </div> */}
          </SoftBox>
          <SoftBox mt={4}>
            <ul>
              {debts.map((debt, index) => (
                <li key={index}>
                  <SoftBox mb={2}>
                    <SoftTypography variant="h6" fontWeight="bold">
                      {debt.creditor}
                    </SoftTypography>
                    <SoftTypography>
                      Amount: ₹{Number(debt.amount).toFixed(2)} | Interest Rate: {debt.interestRate}
                      % | Due Date: {debt.dueDate}
                    </SoftTypography>
                  </SoftBox>
                </li>
              ))}
            </ul>
            <SoftBox mb={2}>
              <SoftTypography variant="h6" fontWeight="bold">
                All Debts: ₹
                {debts.reduce((total, debt) => total + parseFloat(debt.amount), 0).toFixed(2)}
              </SoftTypography>
            </SoftBox>
          </SoftBox>
          <SoftBox mt={4}>
            <SoftTypography variant="h5" fontWeight="bold" mb={2}>
              Add a New Debt
            </SoftTypography>
            <form>
              <SoftInput
                type="text"
                name="creditor"
                placeholder="Creditor"
                value={newDebt.creditor}
                onChange={handleInputChange}
                mb={2}
              />
              <br />
              <SoftInput
                type="number"
                name="amount"
                placeholder="Debt Amount"
                value={newDebt.amount}
                onChange={handleInputChange}
                mb={2}
              />
              <br />
              <SoftInput
                type="number"
                name="interestRate"
                placeholder="Interest Rate"
                value={newDebt.interestRate}
                onChange={handleInputChange}
                mb={2}
              />
              <br />
              <SoftInput
                type="date"
                name="dueDate"
                placeholder="Due Date"
                value={newDebt.dueDate}
                onChange={handleInputChange}
                mb={2}
              />
              <br />
              <SoftButton variant="gradient" color="dark" onClick={addDebt}>
                Add Debt
              </SoftButton>
            </form>
          </SoftBox>
        </SoftBox>
        <Footer />
      </DashboardLayout>
    </div>
  );
}

export default Debts;
