import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { PrivacyNotice, LoadingIndicator, Badge, ProgressBar } from '../components/UIComponents';
import localStorageUtil from '../lib/localStorageUtil';

const Dashboard = () => {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [stats, setStats] = useState({
    totalSkills: 0,
    averageSkillLevel: 0,
    completedQuests: 0,
    totalXP: 0,
    nextMilestone: 1000
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Prüfe, ob Onboarding abgeschlossen wurde
    const onboardingCompleted = localStorageUtil.loadData('nebula_onboarding_completed', false);
    
    if (!onboardingCompleted) {
      // Wenn Onboarding nicht abgeschlossen wurde, leite zum Onboarding weiter
      router.push('/onboarding');
      return;
    }
    
    // Lade Benutzerdaten
    const userData = localStorageUtil.loadData('nebula_user_data', null);
    setUserData(userData);
    
    // Lade Skills und Quests
    const skills = localStorageUtil.loadData('nebula_skills', []);
    const quests = localStorageUtil.loadData('nebula_quests', {
      daily: [],
      weekly: [],
      longterm: []
    });
    
    // Berechne Statistiken
    const totalSkills = skills.length;
    const averageSkillLevel = totalSkills > 0 
      ? skills.reduce((sum, skill) => sum + skill.currentLevel, 0) / totalSkills 
      : 0;
    
    const completedDailyQuests = quests.daily.filter(q => q.completed).length;
    const completedWeeklyQuests = quests.weekly.filter(q => q.completed).length;
    const completedLongtermQuests = quests.longterm.filter(q => q.completed).length;
    const completedQuests = completedDailyQuests + completedWeeklyQuests + completedLongtermQuests;
    
    const totalXP = calculateTotalXP(skills, quests);
    const nextMilestone = Math.ceil(totalXP / 1000) * 1000;
    
    setStats({
      totalSkills,
      averageSkillLevel,
      completedQuests,
      totalXP,
      nextMilestone
    });
    
    // Generiere Aktivitätslog
    const activities = generateRecentActivities(skills, quests);
    setRecentActivities(activities);
    
    setIsLoading(false);
  }, [router]);
  
  const calculateTotalXP = (skills, quests) => {
    // XP aus Skills
    const skillsXP = skills.reduce((sum, skill) => {
      // XP für jedes Level: 100 * level^2
      let levelXP = 0;
      for (let i = 1; i < skill.currentLevel; i++) {
        levelXP += 100 * Math.pow(i, 2);
      }
      // Aktuelle Level-Fortschritt
      levelXP += skill.currentXP;
      return sum + levelXP;
    }, 0);
    
    // XP aus abgeschlossenen Quests
    const questsXP = [
      ...quests.daily.filter(q => q.completed),
      ...quests.weekly.filter(q => q.completed),
      ...quests.longterm.filter(q => q.completed)
    ].reduce((sum, quest) => sum + quest.xp, 0);
    
    return skillsXP + questsXP;
  };
  
  const generateRecentActivities = (skills, quests) => {
    const activities = [];
    
    // Füge abgeschlossene Quests hinzu
    const completedQuests = [
      ...quests.daily.filter(q => q.completed).map(q => ({ ...q, type: 'daily' })),
      ...quests.weekly.filter(q => q.completed).map(q => ({ ...q, type: 'weekly' })),
      ...quests.longterm.filter(q => q.completed).map(q => ({ ...q, type: 'longterm' }))
    ];
    
    completedQuests.forEach(quest => {
      activities.push({
        type: 'quest_completed',
        title: `Quest abgeschlossen: ${quest.title}`,
        xp: quest.xp,
        date: new Date().toISOString() // In einer echten App würde hier das tatsächliche Abschlussdatum stehen
      });
    });
    
    // Füge Skill-Level-Ups hinzu (simuliert)
    skills.forEach(skill => {
      if (skill.currentLevel > 1) {
        activities.push({
          type: 'skill_levelup',
          title: `Skill Level-Up: ${skill.name} erreicht Level ${skill.currentLevel}`,
          xp: 100 * Math.pow(skill.currentLevel - 1, 2),
          date: new Date().toISOString() // In einer echten App würde hier das tatsächliche Level-Up-Datum stehen
        });
      }
    });
    
    // Sortiere nach Datum (neueste zuerst) und begrenze auf 5 Einträge
    return activities
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <LoadingIndicator isLoading={true} text="Dashboard wird geladen..." />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      {userData && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Willkommen zurück, {userData.name}!</h2>
          <p>Hier ist dein aktueller Fortschritt in deiner persönlichen Odyssee.</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <h3 className="text-xl font-semibold mb-3">Gesamtfortschritt</h3>
          <div className="flex items-center justify-between mb-2">
            <span>XP: {stats.totalXP} / {stats.nextMilestone}</span>
            <span>{Math.floor((stats.totalXP / stats.nextMilestone) * 100)}%</span>
          </div>
          <ProgressBar value={stats.totalXP} max={stats.nextMilestone} type="primary" />
          <p className="mt-2 text-sm text-muted">Nächster Meilenstein: {stats.nextMilestone} XP</p>
        </div>
        
        <div className="card">
          <h3 className="text-xl font-semibold mb-3">Skills</h3>
          <div className="flex flex-col">
            <div className="flex justify-between mb-1">
              <span>Anzahl Skills:</span>
              <span className="font-semibold">{stats.totalSkills}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span>Durchschnittliches Level:</span>
              <span className="font-semibold">{stats.averageSkillLevel.toFixed(1)}</span>
            </div>
            <div className="mt-2">
              <button 
                className="btn btn-primary w-full"
                onClick={() => router.push('/skills')}
              >
                Skills verwalten
              </button>
            </div>
          </div>
        </div>
        
        <div className="card">
          <h3 className="text-xl font-semibold mb-3">Quests</h3>
          <div className="flex flex-col">
            <div className="flex justify-between mb-1">
              <span>Abgeschlossene Quests:</span>
              <span className="font-semibold">{stats.completedQuests}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span>Verdiente XP:</span>
              <span className="font-semibold">{stats.totalXP} XP</span>
            </div>
            <div className="mt-2">
              <button 
                className="btn btn-primary w-full"
                onClick={() => router.push('/quests')}
              >
                Quests verwalten
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-xl font-semibold mb-3">Letzte Aktivitäten</h3>
          {recentActivities.length > 0 ? (
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-md">
                  <div className="flex justify-between items-center">
                    <div>
                      <p>{activity.title}</p>
                      <p className="text-sm text-muted">
                        {new Date(activity.date).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge type={activity.type === 'quest_completed' ? 'success' : 'primary'}>
                      +{activity.xp} XP
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted">Noch keine Aktivitäten vorhanden. Beginne mit dem Abschließen von Quests!</p>
          )}
        </div>
        
        <div className="card">
          <h3 className="text-xl font-semibold mb-3">Nächste Schritte</h3>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-md">
              <h4 className="font-medium">Tägliche Reflexion</h4>
              <p className="text-sm">Nimm dir Zeit für eine tägliche Reflexion, um deinen Fortschritt zu verfolgen.</p>
              <button 
                className="btn btn-secondary btn-sm mt-2"
                onClick={() => router.push('/reflection')}
              >
                Zur Reflexion
              </button>
            </div>
            
            <div className="p-3 bg-gray-50 rounded-md">
              <h4 className="font-medium">Quests abschließen</h4>
              <p className="text-sm">Schließe deine täglichen Quests ab, um XP zu sammeln und Fortschritte zu machen.</p>
              <button 
                className="btn btn-secondary btn-sm mt-2"
                onClick={() => router.push('/quests')}
              >
                Zu den Quests
              </button>
            </div>
            
            <div className="p-3 bg-gray-50 rounded-md">
              <h4 className="font-medium">Skills verbessern</h4>
              <p className="text-sm">Arbeite an deinen Skills, um in verschiedenen Lebensbereichen zu wachsen.</p>
              <button 
                className="btn btn-secondary btn-sm mt-2"
                onClick={() => router.push('/skills')}
              >
                Zu den Skills
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
