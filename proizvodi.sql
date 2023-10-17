CREATE TABLE proizvodi (
    RB INT AUTO_INCREMENT PRIMARY KEY,
    Naziv VARCHAR(255) NOT NULL,
    Sadrzaj TEXT,
    Alk DECIMAL(10, 2),
    Pak INT,
    BAR_COD VARCHAR(255),
    Osn_c DECIMAL(10, 2),
    Tros DECIMAL(10, 2),
    VPC DECIMAL(10, 2),
    PN INT,
    VPC_kn DECIMAL(10, 2),
    tip VARCHAR(255),
    pod_tip VARCHAR(255),
    tip_br INT,
    drzava VARCHAR(255)
);
