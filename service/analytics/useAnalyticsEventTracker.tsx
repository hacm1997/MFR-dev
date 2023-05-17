import React from "react";
import ReactGA from "react-ga4";

const useAnalyticsEventTracker = (category="MFR") => {
    const eventTracker = (action = "test action", label = "test label") => {
        ReactGA.event({category, action, label});
    }
    return eventTracker;
}
export default useAnalyticsEventTracker;
