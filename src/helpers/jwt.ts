import jsonwebtoken from "jsonwebtoken";
import "dotenv/config"; // ✅ Carga variables de entorno automáticamente

const generarJWT = (uid: string, name: string) => {
  const secret = process.env.SECRET_JWT;
  // console.log("SECRETO", secret);
  return new Promise((resolve, reject) => {
    const payload = { uid, name };
    jsonwebtoken.sign(
      payload,
      secret as jsonwebtoken.Secret,
      {
        expiresIn: "1m",
      },
      (err, token) => {
        if (err) {
          console.warn(err);
          reject("No se puede generar el token.");
        }
        resolve(token);
      }
    );
  });
};

export default generarJWT;
