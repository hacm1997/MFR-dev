import config from "../../infrastructure/config";

export default async function handler(req: { body: { username: any; password: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; }; }) {
    const {username, password} = req.body;
    if (username === config.USERNAME && password === config.PASSWORD) {
        res.status(200).json({message: "Success"});

    } else {
        res.status(401).json({message: "Invalid username or password"});
    }
}

