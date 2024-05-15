
// import m3dia from "m3dia";
import config from '../config';
import axios from 'axios';
class M3dia {
    constructor() {
        this.token = config.m3token;
        if ( !this.token )
            this.getToken();
    }

    async getToken() {
        try {
            let url = `${config.m3url}/v2/users/signin`
            let data = {
                username: config.m3user,
                password: config.m3pass
            }
            let headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
            let token = await axios.post(url, data, { headers })
            this.token = token.data.access_token
            console.log("token: " + this.token);
        } catch (e) {
            console.error(e)
        }

    }

    async upload(files) {
        const file = files[0]
        if (!this.token) {
            await this.getToken()
        }
        let data = new FormData()
        data.append('media', file)
        data.append('is_convert', false)

        let configUpload = {
            method: 'POST',
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
            timeout: 3600000,
            url: `${config.m3url}/v2/files/upload`,
            headers: {
                'Authorization': `Bearer ${this.token}`,
            },
            data: data
        };
        let response = await axios(configUpload)
        if (response && response.data.length !== 0) {
            return response.data[0]
        }
        return false
    }
}

export default {
    install: (app, options) => {
        window.$m3dia = new M3dia();
        app.config.globalProperties.$m3dia = window.$m3dia;
    },
}