
exports.handler = async (event) => {
    // TODO implement

    console.log(JSON.stringify(event))

    const result =  { msg: "hi",
        geoPoint: {
            long: 0,
            lat: 1
        }}

    const response = {
        statusCode: 200,
        body: JSON.stringify(result)
    };
    return response;
};
