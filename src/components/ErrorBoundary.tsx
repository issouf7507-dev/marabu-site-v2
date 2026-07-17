import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Filet de sécurité racine : sans lui, la moindre exception dans un composant
 * démonte tout l'arbre React et laisse une page blanche.
 *
 * Les textes sont volontairement bilingues et en dur : le boundary doit rester
 * fonctionnel même si c'est i18n lui-même qui a échoué.
 */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Unhandled error:", error, info.componentStack);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ecede3",
          padding: "24px",
          fontFamily: "Poppins, sans-serif",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 420 }}>
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: 300,
              color: "#1d454c",
              marginBottom: "12px",
            }}
          >
            Une erreur est survenue
          </h1>
          <p
            style={{
              fontSize: "0.875rem",
              color: "#1a1a1a80",
              lineHeight: 1.7,
              marginBottom: "32px",
            }}
          >
            Something went wrong. Rechargez la page, ou écrivez-nous si le
            problème persiste.
          </p>
          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => window.location.reload()}
              style={{
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                padding: "14px 32px",
                backgroundColor: "#1d454c",
                color: "#ecede3",
                border: "none",
                cursor: "pointer",
              }}
            >
              Recharger
            </button>
            <a
              href="mailto:contact@marabu.services"
              style={{
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                padding: "14px 32px",
                border: "1px solid #1d454c40",
                color: "#1d454c",
                textDecoration: "none",
              }}
            >
              Nous écrire
            </a>
          </div>
        </div>
      </div>
    );
  }
}
