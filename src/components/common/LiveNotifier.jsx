import { useEffect, useRef } from "react";
import axios from "../../api/axiosConfig";
import toast from "react-hot-toast";

const LiveNotifier = () => {
  const lastUpdateRef = useRef(null);

  useEffect(() => {
    // Initial fetch to get baseline timestamp
    const fetchInitial = async () => {
      try {
        const res = await axios.get("/api/matches/latest-update");
        if (res.data.success && res.data.data.lastUpdate) {
          lastUpdateRef.current = new Date(res.data.data.lastUpdate).getTime();
        }
      } catch (error) {
        console.error("Error fetching initial latest-update", error);
      }
    };
    fetchInitial();

    // Polling every 60 seconds (1 minute instead of 5 for faster UX demo)
    const interval = setInterval(async () => {
      if (!lastUpdateRef.current) return;

      try {
        const res = await axios.get("/api/matches/latest-update");
        if (res.data.success && res.data.data.lastUpdate) {
          const newTimestamp = new Date(res.data.data.lastUpdate).getTime();

          if (newTimestamp > lastUpdateRef.current) {
            // New update found!
            lastUpdateRef.current = newTimestamp;
            toast.success("¡Nuevo resultado cargado!", {
              duration: 5000,
              icon: "🏉",
              style: {
                borderRadius: "10px",
                background: "#002A50",
                color: "#fff",
              },
            });
          }
        }
      } catch (error) {
        // silently fail on polling
      }
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return null; // Invisible component
};

export default LiveNotifier;
