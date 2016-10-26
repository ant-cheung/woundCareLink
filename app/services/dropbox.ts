import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Dropbox {

  private accessToken: String;

  static get parameters() {
    return [[Http]]
  }

  constructor(private http: Http) {
    this.http = http;
    // Access token for dropbox Authorization
    this.accessToken = "SZD7otXSZbAAAAAAAAAAP40cR2JB8HaZps-KzTp4IPjvftPh0wK42jcOi6yV2Quq";
  }

  getUserInfo() {

    let headers = new Headers();

    headers.append('Authorization', 'Bearer ' + this.accessToken);
    headers.append('Content-Type', 'application/json');

    return this.http.post('https://api.dropboxapi.com/2/users/get_current_account', "null", { headers: headers })
      .map(res => res.json());

  }

  uploadFile(fileName: string, content: string) {

    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.accessToken);
    headers.append('Content-Type', 'application/octet-stream');
    headers.append('Dropbox-API-Arg', "{\"path\": \"/WoundCareAppData/Messages/" + fileName + ".txt\",\"mode\": \"add\",\"autorename\": true,\"mute\": false}");

    console.log("Uploading File: " + fileName + content);

    return this.http.post('https://content.dropboxapi.com/2/files/upload', content, { headers: headers })
      .map(res => res.json());
  }

  downloadFile(fileName: string) {

    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.accessToken);
    headers.append('Dropbox-API-Arg', "{\"path\": \"/WoundCareAppData/Messages/" + fileName + "\"}");

    console.log("download file header: " + JSON.stringify(headers));

    return this.http.post('https://content.dropboxapi.com/2/files/download', null, { headers: headers })
      .map(res => res.json());
  }

  getmetadata() {
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.accessToken);
    headers.append('Content-Type', 'application/json');
    headers.append('data', "{\"path\": \"/Matrices.txt\",\"include_media_info\": false,\"include_deleted\": false,\"include_has_explicit_shared_members\": false}");

    return this.http.post('https://api.dropboxapi.com/2/files/get_metadata', null, { headers: headers })
      .map(res => res.json());
  }

  getFolders(path) {

    let headers = new Headers();

    headers.append('Authorization', 'Bearer ' + this.accessToken);
    headers.append('Content-Type', 'application/json');

    let folderPath;

    if (typeof (path) == "undefined" || !path) {

      folderPath = {
        path: ""
      };

    } else {

      folderPath = {
        path: path
      };

    }

    return this.http.post('https://api.dropboxapi.com/2/files/list_folder', JSON.stringify(folderPath), { headers: headers })
      .map(res => res.json());
  }
}