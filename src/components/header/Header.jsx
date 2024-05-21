import { Link } from "react-router-dom";
import {
  AppBar,
  Button,
  MenuItem,
  Select,
  ThemeProvider,
  Toolbar,
  createTheme,
} from "@mui/material";
import "./Header.scss";
import { useCryptoContext } from "../../context/Context";
import PlayList from "../../pages/playlists/PlayList";

const Header = () => {
  const { handleIsOpen, isOpen } = useCryptoContext();
  const { currency, setCurrency } = useCryptoContext();
  const darkWhite = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });
  console.log(isOpen);
  console.log(currency);
  return (
    <header>
      <ThemeProvider theme={darkWhite}>
        <AppBar>
          <div className="container">
            <Toolbar>
              <div className="content">
                <div className="logo">
                  <Link to="/">CRYPTOFOLIO</Link>
                </div>
                <nav>
                  <Select
                    className="select"
                    variant="outlined"
                    defaultValue="USD"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    sx={{
                      width: 80,
                      height: 44,
                      marginLeft: 2,
                      color: "white",
                      ".MuiOutlinedInput-notchedOutline": {
                        borderColor: "black",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "black",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "black",
                      },
                      ".MuiSelect-select": {
                        color: "white",
                      },
                      ".MuiSvgIcon-root": {
                        color: "white",
                      },
                    }}
                  >
                    <MenuItem value={"USD"}>USD</MenuItem>
                    <MenuItem value={"INR"}>INR</MenuItem>
                    <MenuItem value={"EUR"}>EUR</MenuItem>
                  </Select>
                  <Button
                    onClick={() => handleIsOpen()}
                    variant="contained"
                    style={{
                      backgroundColor: "#87CEEB",
                    }}
                  >
                    WATCH LIST
                  </Button>
                </nav>
              </div>
            </Toolbar>
          </div>
        </AppBar>
      </ThemeProvider>
      <PlayList />
    </header>
  );
};

export default Header;
