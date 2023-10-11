const { getTeamDetails, getLaptopDetails } = require('../../src/restController/LaptopController');

describe('LaptopRoute Tests', () => {
  it('should respond with team details when GET /team is called', () => {
    const req = {};
    const res = {
      status: (statusCode) => ({
        json: (data) => {
          expect(statusCode).toBe(200);
          expect(data.team).toBe('backend4-laptopTeam');
          expect(data.memberNames).toEqual(['Sanskar Agarwal', 'Poorvi Dalwai']);
        },
      }),
    };

    getTeamDetails(req, res);
  });

  it('should respond with laptop details when GET /laptop/:location is called', () => {
    const req = {
      params: { location: 'US-NC' },
    };
    const res = {
      status: (statusCode) => ({
        json: (data) => {
          expect(statusCode).toBe(200);
          expect(data.error).toBe(false);
          expect(data.message).toBe('successful retrieval!');
          // Add assertions based on the expected data
        },
      }),
    };

    getLaptopDetails(req, res);
  });

  it('should respond with a 404 error when an invalid location is provided', () => {
    const req = {
      params: { location: 'InvalidLocation' },
    };
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

  // Add more route tests as needed
});
