INSERT INTO politics (government, ruler_male_title, ruler_female_title, government_description, tier1, tier1_male_title, tier1_female_title, tier1_description, tier2, tier2_male_title, tier2_female_title, tier2_description, tier3, tier3_male_title, tier3_female_title, tier3_description) VALUES (
  'Kingdom',
  'King',
  'Queen',
  'A land ruled by a King or Queen',
  'Duchy',
  'Duke',
  'Duchess',
  'A land ruled by a Duke or Duchess',
  'Barony',
  'Baron',
  'Baroness',
  'A land ruled by a Baron or Baroness',
  'County',
  'Count',
  'Countess',
  'A land ruled by a Count or Countess'
);

INSERT INTO politics (government, ruler_male_title, ruler_female_title, government_description, tier1, tier1_male_title, tier1_female_title, tier1_description, tier2, tier2_male_title, tier2_female_title, tier2_description, tier3, tier3_male_title, tier3_female_title, tier3_description) VALUES (
  'Empire',
  'Emperor',
  'Empress',
  'A land ruled by an Emperor or Empress',
  'Bakufu',
  'Shogun',
  'Shogun',
  'A vast territory ruled by a Shogun',
  'Province',
  'Daimyo',
  'Onna-daimyo',
  'A large area of privately owned land ruled by a Daimyo',
  'Koku',
  'Samurai',
  'Onna-bugeisha',
  'Land used to produce the income of a Samurai or Onna-bugeisha'
);

INSERT INTO politics (government, ruler_male_title, ruler_female_title, government_description, tier1, tier1_male_title, tier1_female_title, tier1_description, tier2, tier2_male_title, tier2_female_title, tier2_description, tier3, tier3_male_title, tier3_female_title, tier3_description) VALUES (
  'Republic',
  'Dictator',
  'Dictatrix',
  'A nation governed by a Dictator accountable to their underlings',
  'Council Chair',
  'Councillor',
  'Councillor',
  'A position which oversees collection of Prefects allied for a special interest',
  'Prefect Chair',
  'Prefect',
  'Prefect',
  'A position which oversees collection of Magistrates allied for a special interest',
  'Senate Magistracy',
  'Senate Magistrate',
  'Senate Magistrate',
  'A position within the Senate representing the common people of a province to their leadership'
);

INSERT INTO politics (government, ruler_male_title, ruler_female_title, government_description, tier1, tier1_male_title, tier1_female_title, tier1_description, tier2, tier2_male_title, tier2_female_title, tier2_description, tier3, tier3_male_title, tier3_female_title, tier3_description) VALUES (
  'People',
  'Elder',
  'Elder',
  'A related group of people united by their heritage',
  'Tribe',
  'Chieftain',
  'Chieftain',
  'A related group of people lead by the Chief',
  'Clan',
  'Patriarch',
  'Matriarch',
  'A related group of people lead by the Clan Head',
  'Family',
  'Father',
  'Mother',
  'A related group of people lead by the Family Head'
);

INSERT INTO users (user_name, user_password) VALUES ('Test User2','Test Password2');


-- INSERT INTO hierarchy (tier_number_array,
--   tier_name_array) 
--   VALUES (
--     ARRAY[1,1,1],
--     ARRAY['Joe Smoe','John Doe','Jane Doe','Mary Sue']
-- );

-- INSERT INTO politics (government, ruler_male_title, ruler_female_title, government_description, tier1, tier1_male_title, tier1_female_title, tier1_description, tier2, tier2_male_title, tier2_female_title, tier2_description, tier3, tier3_male_title, tier3_female_title, tier3_description) VALUES (
--   'People',
--   'Elder',
--   'Elder',
--   'A related group of people united by their heritage',
--   'Tribe',
--   'Chieftain',
--   'Chieftain',
--   'A related group of people lead by the Chief',
--   'Clan',
--   'Patriarch',
--   'Matriarch',
--   'A related group of people lead by the Clan Head',
--   'Family',
--   'Father',
--   'Mother',
--   'A related group of people lead by the Family Head'
-- );


INSERT INTO hierarchy (user_id, tier_number_array, tier_name_array) 
  VALUES (
    1,
    1,
    ARRAY[1,1,1],
    ARRAY['King Joe Lee','Duke Robert Carter','Baron Peng Chen','Count Peyton Cysewski']
);

-- SELECT * FROM hierarchy FULL JOIN politics ON hierarchy.user_id=politics.user_id WHERE hierarchy.user_id=1;
-- SELECT * FROM politics FULL JOIN hierarchy.tier_number_array, hierarchy.tier_name_array ON politics.user_id=hierarchy.user_id WHERE hierarchy.user_id=1;



-- SELECT tier_number_array, tier_name_array, government, ruler_male_title, ruler_female_title, government_description, tier1, tier1_male_title, tier1_female_title, tier1_description, tier2, tier2_male_title, tier2_female_title, tier2_description, tier3, tier3_male_title, tier3_female_title, tier3_description FROM hierarchy JOIN politics ON hierarchy.user_id=politics.user_id WHERE hierarchy.user_id=1;