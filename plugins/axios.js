export default function ({
    $axios
  }) {

    $axios.onRequest(config => {
        // console.log('Making request to ' + config.url)
    })

    const app_id = "appettSNBegWGJac6";
    const app_key = "key9rR3nOEjH9HhLW";

    $axios.setHeader('Authorization', 'Bearer ' + app_key);
    $axios.setHeader('Content-Type', 'application/x-www-form-urlencoded');
    $axios.setHeader('Accept', 'application/json');
    $axios.setBaseURL('https://api.airtable.com/v0/' + app_id);

  
    $axios.onError(error => {
        console.log('error is ', error);
    })
}
