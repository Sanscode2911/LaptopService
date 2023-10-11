const fs = require('fs');
const {
  getTeamDetails,
  getLaptopDetails
} = require('../../src/restController/LaptopController');

describe('LaptopController Tests', () => {
  let laptops;

  beforeAll(() => {
    // Load laptops data before running tests
    const data = fs.readFileSync('./assets/data/laptops.json');
    laptops = JSON.parse(data);
  });

  describe('getTeamDetails', () => {
    it('should return team details', (done) => {
      const req = {};
      const res = {
        status: (statusCode) => ({
          json: (data) => {
            expect(statusCode).toBe(200);
            expect(data.team).toBe('backend4-laptopTeam');
            done();
          },
        }),
      };

      getTeamDetails(req, res);
    });
  });

  describe('getLaptopDetails', () => {
    it('should return all laptops without filters', (done) => {
      const req = {
        params: { location: 'US-NC' },
      };
      const res = {
        status: (statusCode) => ({
          json: (data) => {
            expect(statusCode).toBe(200);
            expect(data.error).toBe(false);
            expect(data.data).toBeDefined();
            expect(data.data.length).toBe(laptops.length);
            done();
          },
        }),
      };

      getLaptopDetails(req, res);
    });

    it('should return laptops based on location with tax applied', (done) => {
      const req = {
        params: { location: 'US-NC' },
      };
      const res = {
        status: (statusCode) => ({
          json: (data) => {
            expect(statusCode).toBe(200);
            expect(data.error).toBe(false);
            expect(data.data).toBeDefined();
            expect(data.data.length).toBe(laptops.length);

            // Assuming laptops have tax applied for US-NC
            const firstLaptop = data.data[0];
            const expectedPrice = (laptops[0].price + 0.08 * laptops[0].price).toFixed(3);
            expect(firstLaptop.price).toBe(expectedPrice);
            done();
          },
        }),
      };

      getLaptopDetails(req, res);
    });

    it('should handle invalid location', () => {
      const req = { params: { location: 'InvalidLocation' } };
      const res = {
        status: (statusCode) => ({
          json: (data) => {
            expect(statusCode).toBe(404);
            expect(data.error).toBe(true);
            expect(data.message).toBe('unsuccessful get request!');
            expect(data.data).toBe(null);
          },
        }),
      };

      getLaptopDetails(req, res);
    });

    it('should handle invalid optional parameters', () => {
      const req = {
        params: { location: 'US-NC' },
        query: { minprice: 'invalid', maxprice: 'invalid', rating: 'invalid' },
      };
      const res = {
        status: (statusCode) => ({
          json: (data) => {
            expect(statusCode).toBe(200);
            expect(data.error).toBe(false);
            expect(data.message).toBe('successful retrieval!');
            // Add assertions based on the expected data without filtering
          },
        }),
      };

      getLaptopDetails(req, res);
    });

  });
});
