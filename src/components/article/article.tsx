import styles from "@/styles/Home.module.css";
import { useRef, useState } from "react";
import Image from "next/image";

type Props = {
  setFotoDoArticle: (url: string) => void;
};

export default function Article({ setFotoDoArticle }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null); // ref para câmera
  const [preview, setPreview] = useState<string | null>(null);

  // Abrir galeria
  const handleSelectPhoto = () => {
    fileInputRef.current?.click();
  };

  // Abrir câmera para fotografar
  const handleTakePhoto = () => {
    cameraInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      setFotoDoArticle(url); // envia para o Main
    }
  };

  return (
    <article>
      <div className={styles.article}>
        <p>Imagem fotográfica</p>
        <div className={styles.imagemFotografica}>
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={preview}
              alt="foto"
              style={{
                width: 150,
                height: 150,
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src="/img/macFotografica.png"
              alt="foto"
              style={{
                width: 150,
                height: 150,
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          )}
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={handleSelectPhoto}>SELECIONAR IMAGEM</button>
          <button onClick={handleTakePhoto}>
            <Image src="/img/imgfoto.svg"
                    alt="Foto cadastrada"
                    width={50}
                    height={50} />


          </button>
        </div>

        {/* Input para selecionar foto da galeria */}
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={handleFileChange}
        />

        {/* Input para tirar foto na hora */}
        <input
          type="file"
          accept="image/*"
          capture="environment"
          style={{ display: "none" }}
          ref={cameraInputRef}
          onChange={handleFileChange}
        />
      </div>
    </article>
  );
}
