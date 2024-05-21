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
  const { handleIsOpen } = useCryptoContext();
  const { currency, setCurrency } = useCryptoContext();
  const darkWhite = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

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
                      paddingTop: "50px",
                      ".MuiOutlinedInput-notchedOutline": {
                        border: 0,
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        border: 0,
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        border: 0,
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
