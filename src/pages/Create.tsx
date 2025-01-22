import "./Create.css";
import { useState, KeyboardEvent, useMemo } from "react";
import { Alert, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import PageHeader from "../layout/PageHeader";
import { generatePath } from "react-router-dom";
import { Plaintext } from "../plaintexts";
import { encodeBase64 } from "../util";
import { CopyTextButton } from "../CopyTextButton";
import { languages } from "../constants";
import { Language } from "../Language";

const minLength = 20;

const Create = () => {
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const [origin, setOrigin] = useState("");
  const [mode, setMode] = useState("casual");
  const [language, setLanguage] = useState<Language>();

  const autoLanguage = useMemo(() => {
    const textLetters = text.toLowerCase().split("");

    let bestMatch = languages[0];
    let bestScore = 0;

    for (const item of languages) {
      const score = textLetters.filter(letter => item.alphabet.includes(letter)).length;
      if (score > bestScore) {
        bestMatch = item;
        bestScore = score;
      }
    }

    return bestMatch;
  }, [text]);
  const finalLanguage = language ?? autoLanguage;
  const dir = finalLanguage.rtl ? "rtl" : "ltr";

  const isTooShort = text.trim().length < minLength;

  const copyLink = () => {
    const plaintext: Plaintext = {
      id: "",
      text,
      author,
      origin,
      language: finalLanguage.code,
    };
    const encodedPlaintext = encodeBase64(JSON.stringify(plaintext));
    const link = window.location.origin + process.env.PUBLIC_URL + generatePath("/#/:mode/custom/:data", {mode, data: encodedPlaintext});

    navigator.clipboard.writeText(link);
  };

  const stopPropagation = (event: KeyboardEvent) => {
    // Stop keyboard events of this page from getting processed by KeysPressed,
    // and let the user type text with spaces freely.
    event.stopPropagation();
  };

  return (
    <div
      className="create-page"
      onKeyDown={stopPropagation}
      onKeyUp={stopPropagation}
    >
      <PageHeader headerText={"Create new puzzle"}/>

      <article className="main-content">
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              value={text}
              onChange={(event) => setText(event.target.value)}
              label={"Text"}
              placeholder={"Enter the puzzle phrase to be solved"}
              fullWidth={true}
              multiline={true}
              minRows={5}
              autoFocus={true}
              dir={dir}
            />

            {isTooShort && <Alert severity={"info"}>
                Please type at least {minLength} letters to create a puzzle
            </Alert>}
          </Grid>

          <Grid item xs={5} md={2}>
            <FormControl fullWidth={true}>
              <InputLabel id={"mode-label"}>Mode</InputLabel>
              <Select
                label={"Mode"}
                labelId={"mode-label"}
                value={mode}
                onChange={(event) => setMode(event.target.value)}
              >
                <MenuItem value={"classic"}>Classic</MenuItem>
                <MenuItem value={"casual"}>Casual</MenuItem>
                <MenuItem value={"hard"}>Hardcore</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={7} md={2}>
            <FormControl fullWidth={true}>
              <InputLabel id={"language-label"}>Language</InputLabel>
              <Select
                label={"Language"}
                labelId={"language-label"}
                value={language?.code ?? "auto"}
                onChange={(event) => setLanguage(
                  languages.find(({code}) => code === event.target.value)
                )}
              >
                <MenuItem value={"auto"}>Auto: {autoLanguage.name}</MenuItem>
                {languages.map(({code, name}) => <MenuItem key={code} value={code}>{name}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={5} md={3}>
            <TextField
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
              label={"Author"}
              fullWidth={true}
              dir={dir}
            />
          </Grid>

          <Grid item xs={12} sm={7} md={5}>
            <TextField
              value={origin}
              onChange={(event) => setOrigin(event.target.value)}
              label={"Origin"}
              fullWidth={true}
              dir={dir}
            />
          </Grid>

          <Grid item xs={12}>
            <CopyTextButton
              onClick={copyLink}
              disabled={isTooShort}
              size="large"
              variant="contained"
              color="primary"
            >
              Share the link
            </CopyTextButton>
          </Grid>
        </Grid>
      </article>
    </div>
  );
};

export default Create;
