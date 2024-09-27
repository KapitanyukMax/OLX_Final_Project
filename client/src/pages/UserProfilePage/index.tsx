import { Box, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const UserProfilePage: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();
    const [userData, setUserData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await axios.get(
                    `http://localhost:5000/users/${userId}`
                );
                setUserData(userResponse.data);

                console.log(userResponse.data);

            } catch (error) {
                console.error("Error getting data: ", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [])

    return (
        <Box>
           <Typography>Hello, dear: {userId}</Typography> 
        </Box>
    );
}

export { UserProfilePage };