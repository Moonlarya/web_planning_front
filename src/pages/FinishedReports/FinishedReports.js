import React, { Component } from "react";
import ReportsService from "../../services/ReportsService";
import ReportCard from "../../components/ReportCard/";
import { withAuth } from "../../stores/User";

class FinishedReports extends Component {
  state = {
    reports: [],
    tasks: [],
  };
  async componentDidMount() {
    this.loadInfo();
  }
  loadInfo = async () => {
    const reports = await ReportsService.getAll();
    this.setState({ reports });
  };
  deleteInfo = async (id) => {
    await ReportsService.delete(id);
    this.loadInfo();
  };
  completeReport = async (id) => {
    await ReportsService.complete(id);
    this.loadInfo();
  };
  render() {
    const { reports } = this.state;

    const filteredReports = reports.filter(
      (report) => report.status === "finished"
    );
    return (
      <main>
        <h3 className="m-3 text-center">Завершенные отчеты</h3>
        <div className="d-flex justify-around align-items-start justify-content-center flex-wrap">
          {filteredReports.map((report) => (
            <ReportCard
              key={report._id}
              data={report}
              onDelete={() => this.deleteInfo(report._id)}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default withAuth(FinishedReports);
