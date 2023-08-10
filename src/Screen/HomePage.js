import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BannerCarousel from "../Component/Banner";
import Joblist from "../Component/JobList";
import RecruiterList from "../Component/RecruiterList";
import DefaultTemplate from "../Template/DefaultTemplate";

import "../style/stylingSon.css"
import { faSearch } from "@fortawesome/free-solid-svg-icons";
export default function HomePage() {
  return (
    <DefaultTemplate>
     
      <div className="row Banner">
        <BannerCarousel/>
      </div>
      <dib className="row searchBar">
        <form>
          <input placeholder="Search Jobs"/>
          <button type="submit"><FontAwesomeIcon icon={faSearch}/></button>
        </form>
      </dib>
      <Joblist/>
      <RecruiterList/>
    </DefaultTemplate>
  );
}
