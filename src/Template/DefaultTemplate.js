import Footer from "../Component/Footer";
import Header from "../Component/Header";
import MessageBox from "../Component/MessageBox";

export default function DefaultTemplate({ children }) {
  return (
    <div className="container-fluid">
      <Header />
      <div className="row" style={{ minHeight: "650px" }}>
        {children}
      </div>
      {(() => {
        if (JSON.parse(sessionStorage.getItem("currUser")) != null) {
          return (<MessageBox />);
        }
      })()}
      <Footer />
    </div>
  );
}
