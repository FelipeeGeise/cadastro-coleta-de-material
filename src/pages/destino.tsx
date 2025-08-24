import { useState, useRef, useContext } from "react";
import Link from "next/link";
import styles from "@/styles/Home.module.css";
import { CadastroDestinoContext } from "@/contexts/CadastroDestinoContext";
import Image from "next/image";

export default function Destino() {
  const [preview, setPreview] = useState<string | null>(null);
  const [empresaSelecionada, setEmpresaSelecionada] = useState("");
  const [obs, setObs] = useState("");
  const [mensagem, setMensagem] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const { addCadastroDestino } = useContext(CadastroDestinoContext);

  const empresas = [
    "PRATERIA",
    "ROTAME",
    "JÃO CARLOS",
    "RODHES",
    "DLT",
    "TDS",
    "JOÃO GUILHERME",
    "FT ENGENHARIA",
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  const handleSalvar = () => {
    if (!empresaSelecionada) {
      setMensagem("⚠️ Selecione uma empresa!");
      return;
    }

    addCadastroDestino({
      empresa: empresaSelecionada,
      foto: preview || "",
      obs,
      data: new Date().toISOString(),
    });

    setMensagem("✅ Cadastro salvo com sucesso!");
    setEmpresaSelecionada("");
    setPreview(null);
    setObs("");
  };

  return (
    <div className={styles.corpoDoProjeto}>
      <header className={styles.cabecalho}>
        <h1>Destino</h1>
      </header>

      <div className={styles.section}>
        <Link href="/" className={styles.divSection}>📄 COLETA</Link>
        <Link href="/destino" className={styles.divSection}>🚗 DESTINO</Link>
      </div>

      <div className={styles.container}>
        <h1 className={styles.titulo}>Destino</h1>

        {/* Mensagem de feedback */}
        {mensagem && <div className={styles.mensagem}>{mensagem}</div>}

        <div className={styles.field}>
          <label htmlFor="empresa">Razão Social</label>
          <select
            id="empresa"
            className={styles.select}
            value={empresaSelecionada}
            onChange={(e) => setEmpresaSelecionada(e.target.value)}
          >
            <option value="">Selecione uma empresa</option>
            {empresas.map((empresa) => (
              <option key={empresa} value={empresa}>
                {empresa}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label>IMAGEM</label>
          <div className={styles.imagemFotografica}>
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview} alt="foto" />
            ) : (
              <Image
                src="/img/macFotografia2.png"
                alt="fotografia2"
                width={200}
                height={150}
              />
            )}
          </div>
          <div className={styles.buttons}>
            <button onClick={() => fileInputRef.current?.click()}>
              Selecionar da Galeria
            </button>
            <button onClick={() => cameraInputRef.current?.click()}>
              Tirar Foto Agora
            </button>
          </div>
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <input
            type="file"
            accept="image/*"
            capture="environment"
            style={{ display: "none" }}
            ref={cameraInputRef}
            onChange={handleFileChange}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="obs">Obs:</label>
          <textarea
            id="obs"
            rows={4}
            placeholder="Digite observações aqui..."
            className={styles.textarea}
            value={obs}
            onChange={(e) => setObs(e.target.value)}
          ></textarea>
        </div>

        <div className={styles.salvaElista}>
          <button className={styles.salvar} onClick={handleSalvar}>
            SALVAR
          </button>
          <Link href="/listaDestino" className={styles.listar}>
            LISTA
          </Link>
        </div>
      </div>
    </div>
  );
}
