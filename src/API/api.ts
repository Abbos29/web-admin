export interface LoginDto {
  telegram: string;
  password: string;
}

export class Api {
  constructor() {
    this.URL = "https://engine.amru.host/api/";
    this.token = localStorage.getItem("access-token");
  }
  URL;
  token: string | null;

  async login(creds: LoginDto) {
    return fetch(this.URL + "profile/sig-in", {
      method: "POST",
      body: JSON.stringify(creds),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(this.getJsonResponse);
  }

  private async getJsonResponse(res: Response) {
    if (res.ok) {
      return res.json();
    }

    if (res.status === 401 || res.status === 403) {
      console.warn("Token has expired or is invalid. Removing token from localStorage.");
      localStorage.removeItem("access-token");
      this.token = null;
    }

    const errorText = await res.text();
    throw new Error(`Error ${res.status}: ${errorText}`);
  }

  async createSneakersLot(data: any) {
    return fetch(this.URL + "sneakers/sneakers", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `${this.token ?? ""}`,
      },
    }).then(this.getJsonResponse);
  }

  async getBrands() {
    return fetch(this.URL + "brands/brand", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${this.token ?? ""}`,
      },
    }).then(this.getJsonResponse);
  }

  async getConditions() {
    return fetch(this.URL + "conditions/condition", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${this.token ?? ""}`,
      },
    }).then(this.getJsonResponse);
  }

  async getSneakers() {
    return fetch(this.URL + "sneakers/sneakers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${this.token ?? ""}`,
      },
    }).then(this.getJsonResponse);
  }

  async getSneakerById(id: number) {
    return fetch(`${this.URL}sneakers/sneakers/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${this.token ?? ""}`,
      },
    }).then(this.getJsonResponse);
  }

  async updateSneaker(data: any) {
    return fetch(`${this.URL}sneakers/sneakers`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `${this.token ?? ""}`,
      },
    }).then(this.getJsonResponse);
  }

  async deleteSneaker(id: number) {
    return fetch(`${this.URL}sneakers/sneakers`, {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `${this.token ?? ""}`,
      },
    }).then(this.getJsonResponse);
  }

  async signUp(data: { user_name: string; email: string; telegram: string; password: string }) {
    return fetch(this.URL + "profile/sig-up", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(this.getJsonResponse);
  }
}

const api = new Api();
export default api;
