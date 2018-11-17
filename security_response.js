class SecurityResponse {
  constructor(response) {
    this.statusCode = 1001;
    this.body = [];
    this.response = response;
  }

  setStatusCode(statusCode) {
    this.statusCode = statusCode;
    return this;
  }

  setResponseBody(responseBody) {
    this.body = responseBody;
    return this;
  }

  send() {
    const responseBody = {
      statusCode: this.statusCode
    };

    for (const key in this.body) {
      responseBody[key] = this.body[key];
    }

    this.response.send(responseBody);
  }
}

SecurityResponse.SUCCESS_CODE = 1000;
SecurityResponse.UNKNOWN_ERROR= 1001;
SecurityResponse.DATABASE_ERROR = 1002;
SecurityResponse.LICENSE_KEY_ERROR = 1003;

module.exports = SecurityResponse;
