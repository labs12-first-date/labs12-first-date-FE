const wantedTraits = userProfile => {
  let wantedConditions = [];
  const condition = userProfile.match_conditions.map(matchC => {
    return matchC;
  });
  const moreCondition = condition.map(c => {
    return c.value;
  });
  wantedConditions.push(moreCondition);
  return wantedConditions;
};

const wantedGenders = userProfile => {
  let wantedGenders = [];
  const gender = userProfile.match_gender.map(matchC => {
    return matchC;
  });
  const moreGender = gender.map(c => {
    return c.value;
  });
  wantedGenders.push(moreGender);
  return wantedGenders;
};

const runMatchAlgo = (userProfile, potentialMatches, user) => {
  const zipCodes = userProfile.nearby_zip || [];
  const skipped = userProfile.skipped_users || [];
  const liked = userProfile.liked_users || [];
  const userId = user.uid || null;
  const tempConditions = wantedTraits(userProfile)[0];
  const compGender = wantedGenders(userProfile)[0];
  const noUser = potentialMatches.filter(user => !userId.includes(user.id));
  const noSkipped = noUser.filter(skips => !skipped.includes(skips.id));
  const noLiked = noSkipped.filter(likes => !liked.includes(likes.id));
  const matches = noLiked.filter(match => zipCodes.includes(match.zip_code));
  let foundMatches = [];
  for (let match of matches) {
    for (let condition of match.conditions) {
      for (let matched_cond of tempConditions) {
        if (matched_cond === condition.value) {
          foundMatches.push(match);
        }
      }
    }
  }
  let foundGender = [];
  for (let match of foundMatches) {
    for (let gender of match.gender) {
      for (let matched_gen of compGender) {
        if (matched_gen === gender.value) {
          foundGender.push(match);
        }
      }
    }
  }

  const filterFoundGender = foundGender.reduce((unique, item) => {
    return unique.includes(item) ? unique : [...unique, item];
  }, []);

  return filterFoundGender;
};

export default runMatchAlgo;
