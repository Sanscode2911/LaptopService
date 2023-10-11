const axios = require('axios');
const { exec } = require('child_process');

describe('End-to-End Tests', () => {
  let serverProcess;

  beforeAll((done) => {
    // Start your server before running tests
    serverProcess = exec('node index.js', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error starting the server: ${error}`);
      }
      done();
    });
  },10000);

  afterAll(() => {
    // Stop the server after tests
    serverProcess.kill();
  });

  it('should get team details', async () => {
    const response = await axios.get('http://localhost:3036/laptop/team');
    expect(response.status).toBe(200);
    expect(response.data.team).toBe('backend4-laptopTeam');
    // Add more assertions as needed
  });

  it('should get laptop details for a location', async () => {
    const response = await axios.get('http://localhost:3036/laptop/all/US-NC');
    expect(response.status).toBe(200);
    expect(response.data.error).toBe(false);
    // Add more assertions as needed
  });

  it('should get laptop details with optional parameters', async () => {
    try {
      const location = 'US-NC';
      const optionalParams = {
        minprice: 1000,
        maxprice: 2000,
        rating: 4.0,
        brand: 'Dell',
      };
  
      const queryParams = Object.entries(optionalParams)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join('&');
  
      const url = `http://localhost:3036/laptop/all/${location}?${queryParams}`;
  
      const response = await axios.get(url);
  
      expect(response.status).toBe(200);
      expect(response.data.error).toBe(false);
      expect(response.data.message).toBe('successful retrieval!');
  
  
    } catch (error) {
      throw error;
    }
  });
  
});
