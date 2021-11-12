const axios = require('axios');

test("Should get all heroes", async function (){
    const response = await axios({
        url: "http://localhost:8080/heroes",
        method: "get"
    })
    const heroes = response.data;
    (expect(heroes.length)).toBeGreaterThanOrEqual(1)
    testResponseProperty(heroes)
})

function testResponseProperty(response){
    expect(response[0]).toHaveProperty("id");
    expect(response[0]).toHaveProperty("name");
    expect(response[0]).toHaveProperty("difficult");
    expect(response[0]).toHaveProperty("lane");
    expect(response[0]).toHaveProperty("skills");
    expect(response[0]).toHaveProperty("skins");
}