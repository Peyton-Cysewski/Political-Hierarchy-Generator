INSERT INTO politics (user_id, government, government_description, tier1, tier1_description, tier2, tier2_description, tier3, tier3_description) VALUES (
  0,
  'Kingdom',
  'A land ruled by a King or Queen',
  'Duchy',
  'A land ruled by a Duke or Duchess',
  'Barony',
  'A land ruled by a Baron or Baroness',
  'County',
  'A land ruled by a Count or Countess'
);

INSERT INTO politics (user_id, government, government_description, tier1, tier1_description, tier2, tier2_description, tier3, tier3_description) VALUES (
  0,
  'Empire',
  'A land ruled by an Emperor or Empress',
  'Bakufu',
  'A vast territory ruled by a Shogun',
  'Province',
  'A large area of privately owned land ruled by a Daimyo',
  'Koku',
  'Land used to produce the income of a Samurai'
);

INSERT INTO politics (user_id, government, government_description, tier1, tier1_description, tier2, tier2_description, tier3, tier3_description) VALUES (
  0,
  'Republic',
  'A nation governed by a Dictator accountable to their underlings',
  'Council Chairman',
  'A position which oversees collection of Prefects allied for a special interest',
  'Prefect Chair',
  'A position which oversees collection of Magistrates allied for a special interest',
  'Senate Magistracy',
  'A position within the Senate representing the common people of a province to their leadership'
);

INSERT INTO politics (user_id, government, government_description, tier1, tier1_description, tier2, tier2_description, tier3, tier3_description) VALUES (
  0,
  'People',
  'A related group of people united by their heritage',
  'Tribe',
  'A related group of people lead by the Chief or Chieftess',
  'Clan',
  'A related group of people lead by the Clan Head',
  'Family',
  'A related group of people lead by the Family Head'
);

INSERT INTO users (user_name, user_password) VALUES ('Test User','Test Password');


INSERT INTO hierarchy (user_id, politics_id, tier_number_array,
  tier_name_array) 
  VALUES (
    0,
    1,
    ARRAY[1,1,1],
    ARRAY['Joe Smoe','John Doe','Jane Doe','Mary Sue']
);

-- SELECT * 