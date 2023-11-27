export const Flash = (props) => {
    return (
        <>
            {/* <!-- partial for flashing messages --> */}
            {/* <% if (success.length) {%>*/}
            <div className="alert alert-success alert-dismissible fade show" role="alert">
                {/* <%= success %> */}
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            {/* <% } %> */}

            {/* <% if (error.length) {%> */}
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                {/* <%= error %> */}
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            {/* <% } %> */}
        </>
    );
};