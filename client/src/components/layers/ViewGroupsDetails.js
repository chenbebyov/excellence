import React from 'react';
import { useHistory, Link } from 'react-router-dom';


const ViewGroupsDetails = (props) => {

    const history = useHistory();
    const group = history.location.state.hierarchyItem;

    return (
        <>  
            <Link to={{
                    pathname: "/affiliationToGroup",
                    state: { group }
                }}
            >Set Affiliation To Group </Link>
            
        </>
    )
}
export default ViewGroupsDetails;