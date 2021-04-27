
export default class TeyaApi {
  constructor() {
    this.baseAPI = null;
    this.method = 'GET';
    this.headers = null;
    this.authToken = null;
    this.additionalHeaders = null;
    this.query = null;
    this.body = {};
    this.res = {
      code: null,
      status: null,
      message: null,
      data: null,
      currentPage: null,
      resPerPage: null,
      errors: []
    };
    this.lang = 'en';
  }

  async request() {
    if(!this.url) {
      console.log('URL is required to make a process');
      return false;
    }

    // set default hedaers
    if(!this.headers) {
      this.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    }

    if(this.authToken) {
      this.headers.authorization = `Bearer ${this.authToken}`;
    }

    if(this.additionalHeaders) {
      this.headers = {
        ...this.headers,
        ...this.additionalHeaders        
      }
    }

    if(this.method == 'GET')
      this.body = null;
    else
      this.body = JSON.stringify(this.body);

    await fetch(this.url, {
      method: this.method,
      headers: this.headers,
      body: this.body
    })
    .then((response) => {
      var resJson = response.json();
      this.res.code = response.status;

      return resJson;
    })
    .then((json) => {debugger
      if( this.debug ) console.log(json); 

      var res = json;

      // set response status
      this.res.status = res.status;

      if(res.status == 'fail') {
        var errors = [];
        // this means return errors list
        if(res.errors) {
          res.errors.map( error => {
            errors.push(error[this.lang])
          })

          this.res.errors = errors;
        }
      }
      else {
        if(res.message)
          this.res.message = res.message[this.lang];

        if(res.data)
          this.res.data = res.data;

        if(res.current_page)
          this.res.currentPage = res.current_page;

        if(res.res_per_page)
          this.res.resPerPage = res.res_per_page;
      }
    })
    .catch((error) => {debugger
      console.error(error);
      this.res.errors = ["Could not make the request - check logs"];
    });

    return this.res;
  }

  getErrorsString() {
    var errors = this.res.errors;
    var errorsString = '';

    if(errors.length < 1) { return ''; }

    errors.map( (error) => {
      if(errorsString != '') { errorsString += '\r\n' }

      if(errors.length > 1) errorsString += '\u2022 ';
      errorsString += error;
    });

    return errorsString;
  }


  /*
   *
   * Proceess login
   * 
   */ 

  async login(username, password) {
    if(!this.baseAPI) {
      console.error('baseAPI path is not set');
      return null; 
    }
    
    var errors = false;
    var username = username;
    var password = password;

    if(!username) {
      console.error('Username is required');
      errors = true;
    }

    if(!password) {
      console.error('Password is required');
      errors = true;
    }

    if(errors) { console.error('1x255875'); return false; }

    this.url = `${this.baseAPI}users/login`;
    this.method = 'POST';
    this.body = {
      username: username,
      password: password
    }

    return await this.request();
  }


  /*
   *
   * Proceess login
   * 
   */ 

  async logout() {
    console.log('here')
    if(!this.baseAPI) {
      console.error('baseAPI path is not set');
      return null; 
    }
    
    if(!this.deviceUuid && !this.allDevices) {
      console.error('deviceUuid is required [uuid, all-devices]');
      return null; 
    }

    if(this.deviceUuid) {
      this.query = `device_uuid=${this.deviceUuid}`
    }

    else if (this.allDevices) {
      this.query = `all_devicecs=${this.allDevices}`
    }

    this.url = `${this.baseAPI}users/logout/?${this.query}`;
    this.method = 'GET';

    return await this.request();
  }


  /*
   *
   * Return user profile
   * 
   */ 

  async getProfile() {
    if(!this.baseAPI) {
      console.error('baseAPI path is not set');
      return null; 
    }
    
    this.url = `${this.baseAPI}users/show/profile`;
    this.method = 'GET';
    this.authToken = this.authToken

    return await this.request();
  }


  /*
   *
   * Get subjects
   * 
   */ 

  async getSubjects() {
    if(!this.baseAPI) {
      console.error('baseAPI path is not set');
      return null; 
    }
    
    this.url = `${this.baseAPI}subjects/list`;
    this.method = 'GET';

    return await this.request();
  }


  /*
   *
   * Get levels
   * 
   */ 

  async getLevels() {
    if(!this.baseAPI) {
      console.error('baseAPI path is not set');
      return null; 
    }
    
    this.url = `${this.baseAPI}levels/list`;
    this.method = 'GET';

    return await this.request();
  }


  /*
   *
   * Get settings
   * 
   */ 

  async getSettings() {
    if(!this.baseAPI) {
      console.error('baseAPI path is not set');
      return null; 
    }
    
    if(!this.key) {
      console.error('key path is not set');
      return null; 
    }
    
    this.url = `${this.baseAPI}settings/show/${this.key}`;
    this.method = 'GET';

    return await this.request();
  }


  /*
   *
   * Get posts list
   * 
   */ 

  async getPosts() {
    if(!this.baseAPI) {
      console.error('baseAPI path is not set');
      return null; 
    }
    
    this.url = `${this.baseAPI}posts/list?${this.query}`;
    this.authToken = this.authToken;
    this.method = 'GET';

    return await this.request();
  }


  /*
   *
   * Get posts
   * 
   */ 

  async getPost() {
    if(!this.baseAPI) {
      console.error('baseAPI path is not set');
      return null; 
    }

    if(!this.postUuid) {
      console.error('postUuid is required to make the request');
      return null;
    }
    
    this.url = `${this.baseAPI}posts/show/${this.postUuid}`;
    this.authToken = this.authToken;
    this.method = 'GET';

    return await this.request();
  }

  
  /*
   *
   * Create post
   * 
   */ 

  async createPost() {
    if(!this.baseAPI) {
      console.error('baseAPI path is not set');
      return null; 
    }
    
    this.url = `${this.baseAPI}posts/create`;
    this.authToken = this.authToken;
    this.method = 'POST';

    this.body = {
      title: this.title,
      description: this.description,
      dueDate: this.dueDate || null,
      subject_uuid: this.subjectUuid,
      level_uuid: this.levelUuid
    }

    return await this.request();
  }

  
  /*
   *
   * Update post
   * 
   */ 

  async updatePost() {
    if(!this.baseAPI) {
      console.error('baseAPI path is not set');
      return null; 
    }

    if(!this.postUuid) {
      console.error('postUuid is required to make the request');
      return null;
    }
    
    this.url = `${this.baseAPI}posts/update/${this.postUuid}`;
    this.authToken = this.authToken;
    this.method = 'POST';

    var body = {};

    if(this.title) { body = { ...body, title: this.title } };
    if(this.description) { body = { ...body, description: this.description } };
    if(this.due_date) { body = { ...body, due_date: this.due_date } };
    if(this.subject_uuid) { body = { ...body, subject_uuid: this.subject_uuid } };
    if(this.level_uuid) { body = { ...body, level_uuid: this.level_uuid } };
    
    if(this.status) { 
      if(this.status == 'cancelled') {
        if(!this.cancellation_reason || !this.cancellation_description) {
          console.log('Missing requirements to cancel '
            + 'cancellation_reason and cancellation_description');
          return null;
        }

        body = { 
          ...body, 
          status: this.status,
          cancellation_reason: this.cancellation_reason,
          cancellation_description: this.cancellation_description
        } 
      }
    };

    this.body = body

    console.log(this.body);

    return await this.request();
  }

  
  /*
   *
   * List bids
   * 
   */ 

  async getBids() { 
    if(!this.baseAPI) {
      console.error('baseAPI path is not set');
      return null; 
    }

    if(!this.postUuid) {
      console.error('postUuid is required to make the request');
      return null;
    }
    
    this.url = `${this.baseAPI}bids/list/?post_uuid=${this.postUuid}`;
    this.authToken = this.authToken;
    this.method = 'GET';

    return await this.request();
  }

  
  /*
   *
   * Create bid
   * 
   */ 

  async createBid() {
    if(!this.baseAPI) {
      console.error('baseAPI path is not set');
      return null; 
    }

    if(!this.postUuid) {
      console.error('postUuid is required to make the request');
      return null;
    }

    if(!this.amount) {
      console.error('amount is required to make the request');
      return null;
    }
    
    this.url = `${this.baseAPI}bids/create/${this.postUuid}`;
    this.authToken = this.authToken;
    this.method = 'POST';
    this.body = {
      amount: this.amount
    }

    return await this.request();
  }


  
  /*
   *
   * Update bid
   * 
   */ 

  async updateBid() {
    if(!this.baseAPI) {
      console.error('baseAPI path is not set');
      return null; 
    }

    if(!this.bidUuid) {
      console.error('bidUuid is required to make the request');
      return null;
    }

    this.url = `${this.baseAPI}bids/update/${this.bidUuid}`;
    this.authToken = this.authToken;
    this.method = 'POST';

    // set the fields of update
    var body = {};

    if(this.cancelledAt) {
      this.body = { cancelled_at: true };
    }
    else if(this.rejectedAt) {
      this.body = { rejected_at: this.rejectedAt }
    }
    else if(this.acceptedAt) {
      // bid accepted
    }
    else if(this.amount) {
      // update amount
    }

    return await this.request();
  }


  
  /*
   *
   * Create bid
   * 
   */ 

  async deleteBid() { 
    // for admin only 
    // cancelled for development purposes
    return null;

    // comment above lines to instate again

    if(!this.baseAPI) {
      console.error('baseAPI path is not set');
      return null; 
    }

    if(!this.bidUuid) {
      console.error('bidUuid is required to make the request');
      return null;
    }
    
    this.url = `${this.baseAPI}bids/delete/${this.bidUuid}`;
    this.authToken = this.authToken;
    this.method = 'POST';
    this.body = {
      amount: this.amount
    }

    return await this.request();
  }



  /*
   *
   * Get attachments
   * 
   */ 

  async getAttachments() {
    if(!this.baseAPI) {
      console.error('baseAPI path is not set');
      return null; 
    }

    if(!this.postUuid) {
      console.error('postUuid is required to make the request');
      return null;
    }
    
    this.url = `${this.baseAPI}attachments/list/?post_uuid=${this.postUuid}`;
    this.authToken = this.authToken;
    this.method = 'GET';

    return await this.request();
  }

  
  /*
   *
   * Delete attachments
   * 
   */ 

  async deleteAttachments() {
    if(!this.baseAPI) {
      console.error('baseAPI path is not set');
      return null; 
    }

    if(!this.fileUuid) {
      console.error('fileUuid is required to make the request');
      return null;
    }    
    
    this.url = `${this.baseAPI}attachments/delete/${this.fileUuid}`;
    this.authToken = this.authToken;
    this.method = 'GET';

    return await this.request();
  }


  
  /*
   *
   * Get notifications
   * 
   */ 

  async getNotifications() {
    if(!this.baseAPI) {
      console.error('baseAPI path is not set');
      return null; 
    }
    
    this.url = `${this.baseAPI}notifications/list`;
    this.authToken = this.authToken;
    this.method = 'GET';

    return await this.request();
  }


}