import request from "supertest";

const baseURL = "http://localhost:8081"

test("get result from calculations", async () => {
    const input = {
        gebaeudeNutzflaeche: 150,
        bundesland: "berlin",
        anzahlBeheizterRaeume: 8,
        bewohnerAnzahl: 4
    };

    const response = await request(baseURL)
        .post("/api/calculate")
        .send(input)
        .set('Accept', 'application/json');

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);

    expect(response.body.investitionHeizfensterSystem).toEqual(expect.anything());
});
